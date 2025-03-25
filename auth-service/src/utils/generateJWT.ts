import jwt from 'jsonwebtoken';
import User from '../models/user';

const JWT_SECRET = process.env.JWT_SECRET!;

export const generateJWT = (user: User) => {
    return jwt.sign({
            id: user.id, email: user.email
        },
        JWT_SECRET
        // TODO: EXPIRES_IN functionality
    );
};