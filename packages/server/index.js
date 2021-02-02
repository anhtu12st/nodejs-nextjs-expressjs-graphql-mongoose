require('dotenv').config() // load environment variables
const config = require('./config')
const server = require('http').createServer()
const expressApp = require('./app')
const { connectDb } = require('./utils/mongoDb')

/* eslint-disable no-console */
console.info('Stage:', config.stage)
connectDb(config.mongoUrl)
  .then(() => {
    console.log(`🛫 MongoDB connected at: ${config.mongoUrl}`)
    // Mount the express app here
    server.on('request', expressApp)

    // Start server
    server.listen(config.port, () => {
      console.info(`🚀 Running a GraphQL API server at: http://localhost:${config.port}/graphql`)
    })
  })
  .catch((err) => {
    console.log('💥 MongoDB connect failed:')
    console.log(err.message)
  })
