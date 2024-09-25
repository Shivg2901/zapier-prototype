require('dotenv').config()

import { PrismaClient } from "@prisma/client";
import { JsonObject } from "@prisma/client/runtime/library";
import { Kafka } from "kafkajs"
import { parse } from "./utils";
import { sendSol } from "./sol";
const TOPIC_NAME = "zap-events"

const prismaClient = new PrismaClient();

const kafka = new Kafka({
    clientId: "outbox-processors",
    brokers: ['localhost:9092']
})

async function main() {
    const consumer = kafka.consumer({
        groupId: 'main-worker'
    });
    await consumer.connect()

    const producer = kafka.producer();
    await producer.connect();
    
    await consumer.subscribe({
        topic: TOPIC_NAME,
        fromBeginning: true
    })

    await consumer.run({
        autoCommit: false,
        eachMessage: async({topic, partition, message}) => {
            console.log({
                partition,
                offset: message.offset,
                value: message.value?.toString()
            })

            if(!message.value?.toString()) {
                return;
            }
            let parsedValue; 
            try {
                parsedValue = JSON.parse(message.value?.toString() || '{}'); 

            } catch (error) {
                console.error("Error parsing message:", error);
                return; 
            }

            const zapRunId = parsedValue.zapRunId;
            const stage = parsedValue.stage;
            const zapRunDetails = await prismaClient.zapRun.findFirst({
                where: {
                    id: zapRunId
                },
                include: {
                    zap: {
                        include: {
                            actions: {
                                include: {
                                    type: true
                                }
                            }
                        }
                    }
                }
            })

            if(!zapRunDetails?.zap?.actions) {
                console.log("Error: zapRunDetails or its properties are undefined");
                return;
            }
            const currentAction = zapRunDetails?.zap.actions.find(x => x.sortingOrder === stage)

            console.log(currentAction);

            if(!currentAction) {
                console.log("error")
                return;
            }

            const zapRunMetaData = zapRunDetails?.metaData

            if(currentAction.type.id === 'email') {
                
                if (currentAction.metadata && zapRunMetaData) {
                    const to = parse((currentAction.metadata as JsonObject)?.email as string, zapRunMetaData);
                    const body = parse((currentAction.metadata as JsonObject)?.body as string, zapRunMetaData);
                    console.log("email " + to + " " + body);
                }
            }

            if(currentAction.type.id === 'send-sol') {
                const zapRunMetaData = zapRunDetails?.metaData
                if (currentAction.metadata && zapRunMetaData) {
                    const amount = parse((currentAction.metadata as JsonObject)?.amount as string, zapRunMetaData);
                    const address = parse((currentAction.metadata as JsonObject)?.wallet as string, zapRunMetaData);
                    sendSol(address, amount);
                    console.log("sending solana " + amount + " to " + address);
                }
            }


            await new Promise(r => setTimeout(r, 500))

            const zapId = message.value?.toString;
            const lastAction = (zapRunDetails?.zap.actions.length || 1) - 1;
            if(lastAction !== stage) {
                await producer.send({
                    topic: TOPIC_NAME,
                    messages:  [{
                        value: JSON.stringify({
                            stage: stage + 1,
                            zapRunId
                        })
                    }]
                })
            } 
            await consumer.commitOffsets([{
                topic: TOPIC_NAME,
                partition: partition,
                offset: (parseInt(message.offset) + 1).toString()
            }])

        }
    })
}

main()