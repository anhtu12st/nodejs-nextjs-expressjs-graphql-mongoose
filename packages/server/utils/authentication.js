const jwt = require('jsonwebtoken')
const config = require('../config')

const createToken = (user) => {
  // Sign the JWT
  if (!user.role) throw new Error('No user role specified')

  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    config.jwt.secret,
    { algorithm: 'HS256', expiresIn: config.jwt.expiry }
  )
}

module.exports = {
  createToken,
}
