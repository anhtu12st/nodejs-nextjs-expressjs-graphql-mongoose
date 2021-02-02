/* eslint-disable no-unused-vars */
const faker = require('faker')
const { UserTC, UserSchema } = require('../model/user')

const resolver = function () {}
resolver.fakeData = UserTC.addResolver({
  name: 'user',
  type: UserTC,
  args: { record: UserTC.getInputType() },
  resolve: async ({ source, args }) => {
    const user = new UserSchema({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    })
    return await user.save()
  },
})

module.exports = resolver
