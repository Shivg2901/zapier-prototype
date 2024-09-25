import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

async function main() {
    await prismaClient.availableTrigger.create({
        data: {
            id: "webhook",
            name: "Webhook",
            image: "https://mailparser.io/wp-content/uploads/2018/08/what-is-a-webhook.jpeg"
        }
    })

    await prismaClient.availableAction.create({
        data: {
            id: "send-sol",
            name: "Send Solana",
            image: "https://images.ctfassets.net/jg6lo9a2ukvr/7LFvam4zz8s3y7acW0L59P/1d95950167b950076a3fe8e6ce970e4e/Blog_Header_SOL__1_.png"
        }
    })

    await prismaClient.availableAction.create({
        data: {
            id: "email",
            name: "Send Email",
            image: "https://www.pcworld.com/wp-content/uploads/2023/04/gmail_logo-100758589-orig.jpg?quality=50&strip=all"
        }
    })
}

main()