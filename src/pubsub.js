import { PubSub } from 'apollo-server-express'
import { RedisPubSub } from 'graphql-redis-subscriptions';
export let pubsub
const options = {
    host: '192.168.1.47',
    port: 6379,
    retryStrategy: times => {
        // reconnect after
        return Math.min(times * 50, 2000);
    }
};
if (process.env.ENV_TYPE === 'dev') {
    pubsub = new PubSub()
} else pubsub = new RedisPubSub(options);
