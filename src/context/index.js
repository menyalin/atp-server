import jwt from 'jsonwebtoken'
import models from '../models/index.js'

const getMe = async (req) => {
  const token = req.headers.authorization
  if (token) {
    try {
      return await jwt.verify(token.split(' ')[ 1 ], process.env.JWT_SECRET)
    } catch (e) {
      return null
    }
  } else return null
}

export default async ({ req, connection }) => {
  if (connection) {
    return connection.context
  } else {
    const me = await getMe(req)
    return {
      models,
      me
    }
  }
}
