import jwt from 'jsonwebtoken'
import { env } from '../env.ts'

type GenerateTokenType = {
    id: string
    role: 'ADMIN' | 'MEMBER' | 'VIEWER'
}
export const generateToken = ({ id, role }: GenerateTokenType) => {
    return jwt.sign(
        {
            id,
            role,
        },
        env.JWT_SECRET,
        {
            expiresIn: '1h',
        }
    )
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, env.JWT_SECRET)
}
