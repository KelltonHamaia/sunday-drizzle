import { fakerEN as faker } from '@faker-js/faker'
import { hash } from 'argon2'
import { db } from '../../db/client.ts'
import { users } from '../../db/schema.ts'

type UserRole = {
    role: 'ADMIN' | 'MEMBER' | 'VIEWER'
}
export async function makeUser({ role }: UserRole) {
    const passwordBeforeHash = '123456'

    const user = await db
        .insert(users)
        .values({
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: await hash(passwordBeforeHash),
            role,
        })
        .returning()

    return {
        passwordBeforeHash,
        user: user[0],
    }
}
