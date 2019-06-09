import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import './todos/todos'

import api from './routes/api'

const start = (port, mongoUrl) => {
  mongoose.connect(mongoUrl, { useNewUrlParser: true })

  const app = express()

  app.disable('etag');

  app.use(morgan('dev'))

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  app.use('/api', api)

  app.get('/', (req, res) => {
    res.status(200).send('hello')
  })

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on port ${port}`)
  })
}

export default start
