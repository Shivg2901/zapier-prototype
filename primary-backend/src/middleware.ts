import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { JWT_PASSWORD } from "./config";



export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization as unknown as string;

    if(!token) {
        console.log("no token")
        return res.status(401).json({
            
            message: 'No token'
        });
    }

    try {
        const payload = jwt.verify(token, JWT_PASSWORD);
        if(payload) {
            //@ts-ignore
            req.id = payload.id;
            next();
        } else {
            
        }
    } catch(err) {
        return res.status(403).json({
            message: "You are not logged in"
        })
    } 
}