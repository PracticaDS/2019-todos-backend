import _ from 'lodash'

import start from './src/server'

const isProduction = process.env.NODE_ENV === 'production'

function validateProductionConfig() {
  if (isProduction) {
    if (_.isUndefined(process.env.PORT)) {
      throw new Error('No port configured, set PORT env var');
    }
    if (_.isUndefined(process.env.MONGO_URL)) {
      throw new Error('No mongo url configured, set MONGO_URL env var');
    }
  }
}

validateProductionConfig();

const port = process.env.PORT ? process.env.PORT : 3001
const mongoUrl = process.env.MONGO_URL ? process.env.MONGO_URL : 'mongodb://localhost:27017/todos'

start(port, mongoUrl)
