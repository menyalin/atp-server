import 'dotenv/config'
import './db'
import './pgDB'
import cors from 'cors'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import schema from './schema'
import resolvers from './resolvers'
import context from './context'

const app = express()
app.use(cors())
const port = process.env.PORT || 3000

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context
})

server.applyMiddleware({ app, path: '/graphql' })
app.listen({ port }, () => {
  // eslint-disable-next-line no-console
  console.log(`Apollo Server on http://localhost:${ port }/graphql`)
})
