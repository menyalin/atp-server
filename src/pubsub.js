import { RedisPubSub } from 'graphql-redis-subscriptions'

const options = {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
}

export const pubsub = new RedisPubSub({
    connection: options
})



