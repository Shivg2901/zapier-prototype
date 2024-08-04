import express from "express";
const app = express();
import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

app.use(express.json())


// https://hooks.zapier.com/hooks/catch/19672132/2un00ah/
//passwords

app.post('/hooks/catch/:userId/:zapId', async (req, res) => {
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const body = req.body

    await client.$transaction(async (tx) => {
        const run = await tx.zapRun.create({
            data: {
                zapId: zapId,
                metaData: body
            }
        })

        await tx.zapRunOutbox.create({
            data: {
                zapRunId: run.id
            }
        })
    })

    res.json({
        message: 'Webhook recieved'
    })
    
})

app.listen(3000)

