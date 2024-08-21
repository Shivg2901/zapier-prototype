import { Router } from "express";
import { prismaClient } from "../db";

const router = Router();

router.get("/available", (req, res) => {
    const availableTrigger = prismaClient.availableTrigger.findMany({});
    return res.json({
        availableTrigger
    })
})

export const triggerRouter = router;