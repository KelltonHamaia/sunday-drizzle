import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { code } from '../shared/status-code.ts'

export const healthCheckRoute: FastifyPluginAsyncZod = async (server) => {
    server.get(
        '/health-check',
        {
            schema: {
                tags: ['Health checking'],
                summary: 'Health Checking route',
                description: 'Check if server is running ok',
                response: {
                    200: z.object({
                        message: z.string(),
                    }),
                },
            },
        },
        async (_, reply) => {
            return reply.status(code.OK).send({ message: 'ok' })
        }
    )
}
