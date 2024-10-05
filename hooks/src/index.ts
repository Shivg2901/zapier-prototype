import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const client = new PrismaClient();

const PORT = process.env.PORT || 3005;

app.use(express.json());

app.post('/hooks/catch/:userId/:zapId', async (req, res) => {
    const { userId, zapId } = req.params;
    const body = req.body;

    await client.$transaction(async (tx) => {
        const run = await tx.zapRun.create({
            data: {
                zapId: zapId,
                metaData: body,
            },
        });

        await tx.zapRunOutbox.create({
            data: {
                zapRunId: run.id,
            },
        });
    });

    res.json({
        message: 'Webhook received',
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
