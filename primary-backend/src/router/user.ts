import { Router } from "express";
import { authMiddleware } from "../middleware";
import { SigninSchema, SignupSchema } from "../types";
import { prismaClient } from "../db";
import jwt from 'jsonwebtoken'
import { JWT_PASSWORD } from "../config";


const router = Router();

router.post('/signup', async (req, res) => {
    const body = req.body;
    const parsedData = SignupSchema.safeParse(body);

    if(!parsedData.success) {
        return res.status(411).json({
            message: 'Invalid Input'
        })
    }

    const userExists = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username
        }
    })

    if(userExists) {
        return res.status(403).json({
            message: 'User already exists'
        })
    }

    await prismaClient.user.create({
        data: {
            email: parsedData.data.username,
            password: parsedData.data.password,
            name: parsedData.data.name
        }
    })

    //send email
    return res.json({
        message: 'Please verify your email'
    })
})

router.post('/signin', async(req, res) => {

    const body = req.body;
    const parsedData = SigninSchema .safeParse(body);

    if(!parsedData.success) {
        return res.status(411).json({
            message: 'Invalid Input'
        })
    }

    const user = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username,
            password: parsedData.data.password
        }
    })

    if(!user) {
        return res.status(403).json({
            message: 'Sorry the credentials are incorrect'
        })
    }

    const token = jwt.sign({
        id: user.id
    }, JWT_PASSWORD)

    res.json({
        token: token
    })
})

router.get('/', authMiddleware,async (req, res) => {
    const id = req.id
    const user = await prismaClient.user.findFirst({
        where: {
            id
        },
        select: {
            email: true,
            name: true
        }
    })
    return res.json({
        user
    })
})

export const userRouter = router