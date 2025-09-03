import { hash } from 'argon2'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '../db/client.ts'
import { users } from '../db/schema.ts'
import { code } from '../shared/status-code.ts'

export const createUserRoute: FastifyPluginAsyncZod = async (server) => {
    server.post(
        '/create-user',
        {
            schema: {
                tags: ['User'],
                summary: 'Create an user',
                description: 'This route creates an user',
                body: z.object({
                    name: z.string({ error: 'name is required.' }),
                    email: z.email({ error: 'E-mail is required' }),
                    password: z.string().min(2, {
                        error: 'password must be ate least 6 length',
                    }),
                    role: z
                        .enum(['ADMIN', 'MEMBER', 'VIEWER'])
                        .default('VIEWER'),
                }),
                response: {
                    201: z.object({
                        id: z.string(),
                    }),
                    500: z.object({
                        message: z.string(),
                    }),
                },
            },
        },
        async (request, reply) => {
            try {
                const { name, email, password, role } = request.body
                const passwordHash = await hash(password)

                const result = await db
                    .insert(users)
                    .values({
                        name,
                        email,
                        password: passwordHash,
                        role,
                    })
                    .returning()

                if (!result) {
                    reply.status(code.INTERNAL_SERVER_ERROR).send({
                        message:
                            'There was an error when trying to create an new use. Try again later.',
                    })
                }

                const user = result[0]

                return reply.status(code.CREATED).send({
                    id: user.id,
                })
            } catch (error) {
                // biome-ignore lint/suspicious/noConsole: <dev>
                console.log(error)
                return
            }
        }
    )
}
