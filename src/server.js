const cluster = require('cluster')
const numCpu = require('os').cpus().length
import 'dotenv/config'
import './pgDB'
import cors from 'cors'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import schema from './schema'
import resolvers from './resolvers'
import context from './context'

const http = require('http')



const port = process.env.PORT || 3000
const app = express()
app.use(cors())
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context
})
server.applyMiddleware({ app, path: '/graphql' })

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

if (cluster.isMaster) {
  for (let i = 0;i < numCpu;i++) {
    cluster.fork()
  }
  cluster.on('exit', (worker, code, signal) => {
    // eslint-disable-next-line no-console
    console.log(`Worker ${worker.process.pid} died`)
  })
} else {
  httpServer.listen({ port }, () => {
    // eslint-disable-next-line no-console
    console.log(`Apollo Server on http://localhost:${port}/graphql`)
  })
}



