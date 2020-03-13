import { PubSub } from 'apollo-server-express'
import { RedisPubSub } from 'graphql-redis-subscriptions';
let pubsub
const options = {
    retryStrategy: times => {
        // reconnect after
        return Math.min(times * 50, 2000);
    }
};
if (process.env.ENV_TYPE === 'dev') {
    pubsub = new PubSub()
} else pubsub = new RedisPubSub();

export { pubsub }