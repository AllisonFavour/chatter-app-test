import {sign, SignOptions} from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
}


interface JwtPayload {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
}


export function generateToken(payload: JwtPayload, options?: SignOptions) {
    return sign(payload, JWT_SECRET!, {expiresIn: '3h', ...options});
}