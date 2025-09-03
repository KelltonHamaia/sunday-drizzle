import { fakerEN as faker } from '@faker-js/faker'
import { hash } from 'argon2'
import supertest from 'supertest'
import { expect, it } from 'vitest'
import { server } from '../app.ts'
import { code } from '../shared/status-code.ts'

it('should create an user', async () => {
    await server.ready()

    const response = await supertest(server.server)
        .post('/create-user')
        .set('Content-type', 'Application/json')
        .send({
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: await hash('123456'),
        })

    expect(response.status).toBe(code.CREATED)
    expect(response.body).toEqual({
        id: expect.any(String),
    })
})
