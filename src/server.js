import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'

import api from './routes/api'

const app = express()

app.disable('etag');

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', api)

app.get('/', (req, res) => {
  res.status(200).send('hello')
})

export default app
