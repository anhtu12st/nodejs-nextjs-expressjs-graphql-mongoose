const express = require('express')
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql')
const winston = require('winston')
const expressWinston = require('express-winston')
require('winston-mongodb')

const config = require('./config')
const graphqlSchema = require('./shema/index')

const extensions = ({ context }) => ({
  runTime: Date.now() - context.startTime,
})

const logger = function (req, res, next) {
  expressWinston.logger({
    transports: [
      new winston.transports.MongoDB({
        db: config.mongoUrl,
        options: { useUnifiedTopology: true },
        metaKey: 'meta',
      }),
    ],
    format: winston.format.json({ space: 2 }),
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: 'HTTP {{req.method}} {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  })
  next()
}

const app = express()

app.use(logger)

// cors
// const whitelist = config.corsWhiteList;
// const corsOptions = {
//   origin(origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// };
// app.use(cors(corsOptions)); TODO: add cors later
app.use(cors())

// body-parser
app.use(express.json({ limit: '1MB' }))

/* eslint-disable no-unused-vars */
app.use(
  '/graphql',
  graphqlHTTP((request) => ({
    context: { startTime: Date.now() },
    schema: graphqlSchema,
    graphiql: true,
    extensions,
  }))
)

module.exports = app
