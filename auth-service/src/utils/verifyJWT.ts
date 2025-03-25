import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';

const JWT_SECRET = process.env.JWT_SECRET!;

export const verifyJWT = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid or Expired Token');
    }
};

export const authenticatedUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({error: 'Not Authorized for Access'});

    try {
        req.user = verifyJWT(token);
        next();
    } catch (error) {
        res.status(401).json({error: 'Invalid Token'});
    }
};