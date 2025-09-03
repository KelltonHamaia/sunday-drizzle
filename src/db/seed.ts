/** biome-ignore-all lint/style/noMagicNumbers: <seed purposes> */

import { fakerEN as faker } from '@faker-js/faker'
import { hash } from 'argon2'
import { db } from './client.ts'
import { tasks, users } from './schema.ts'

async function seed() {
    const passswordHash = await hash('123456')
    const usersSeed = await db
        .insert(users)
        .values([
            {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: passswordHash,
                role: 'ADMIN',
            },
            {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: passswordHash,
                role: 'MEMBER',
            },
            {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: passswordHash,
                role: 'VIEWER',
            },
        ])
        .returning()

    await db.insert(tasks).values([
        {
            title: faker.music.songName(),
            description: faker.lorem.words(4),
            managerId: usersSeed[0].id,
            userAssignedId: usersSeed[1].id,
        },
    ])
}

seed()
