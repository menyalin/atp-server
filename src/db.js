/* eslint-disable no-console */
import mongoose from 'mongoose'

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('db connected'))
  .catch(err => console.log('error connction db', err.message))
