import 'dotenv/config'
import './db'
import './pgDB'
const http = require('http')
import cors from 'cors'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import schema from './schema'
import resolvers from './resolvers'
import context from './context'

const port = process.env.PORT || 3000
const app = express()
app.use(cors())
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context
})
server.applyMiddleware({ app, path: '/graphql' })


const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);


httpServer.listen({ port }, () => {
  // eslint-disable-next-line no-console
  console.log(`Apollo Server on http://localhost:${ port }/graphql`)
})
