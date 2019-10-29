import jwt from 'jsonwebtoken'
import models from '../models'

const getMe = async (req) => {
  const token = req.headers.authorization
  if (token) {
    try {
      return await jwt.verify(token.split(' ')[1], process.env.JWT_SECRET)
    } catch (e) {
      return null
    }
  } else return null
}

export default async ({ req }) => {
  const me = await getMe(req)
  return {
    models,
    me
  }
}
