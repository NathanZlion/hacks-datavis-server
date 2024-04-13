
import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from "express";
import { Types } from 'mongoose';

const authorization = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = getTokenFromRequest(req);
        if (!token)
            return res.status(401).json({ message: "Unauthorized" });

        if (!verifyToken(token))
            return res.status(401).json({ message: "Unauthorized" });

        next();
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Something went wrong." });
    }
}

export function getTokenFromRequest(req: Request) : string | undefined{
    try {
        const token: string = req.headers.authorization!.split(" ")[1];
        return token;
    } catch (error) {
        return undefined;
    }
}

export function verifyToken(token: string) : Boolean {
    return process.env.OVERWRITE_DB_TOKEN === token;
}

export default authorization;