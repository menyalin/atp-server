import { PubSub } from 'apollo-server-express'
import { RedisPubSub } from 'graphql-redis-subscriptions';
let pubsub = new PubSub()

export { pubsub }