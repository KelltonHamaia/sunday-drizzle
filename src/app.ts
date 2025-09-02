import fastifySwagger from '@fastify/swagger'
import scalarAPIReference from '@scalar/fastify-api-reference'
import fastify from 'fastify'
import {
    jsonSchemaTransform,
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { healthCheckRoute } from './routes/health-check.ts'

export const server = fastify({
    logger: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
            },
        },
    },
}).withTypeProvider<ZodTypeProvider>()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'Sunday',
            description:
                'Api simples para fins de estudos da tecnologia fastify',
            version: '1.0.0',
        },
    },
    transform: jsonSchemaTransform,
})

server.register(scalarAPIReference, {
    routePrefix: '/docs',
    configuration: {
        theme: 'elysiajs',
    },
})

server.register(healthCheckRoute)
