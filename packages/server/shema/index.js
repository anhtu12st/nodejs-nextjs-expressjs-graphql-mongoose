const { SchemaComposer } = require('graphql-compose')

const schemaComposer = new SchemaComposer()

const { UserQuery, UserMutation } = require('./user')

schemaComposer.Query.addFields({
  ...UserQuery,
})

schemaComposer.Mutation.addFields({
  ...UserMutation,
})

module.exports = schemaComposer.buildSchema()
