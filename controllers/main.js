let uniqid = require('uniqid')
const jwt = require('jsonwebtoken')
const { BadRequestError } = require('../errors/')

const login = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    throw new BadRequestError(`please provide the necessary credentials`)
  }
  const id = uniqid()
  // GENERATING ENCODED JWT ACCESS TOKEN STRING
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
  res.status(200).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {
  console.log(req.user)
  const luckyNumber = Math.floor(Math.random() * 100)
  res.status(200).json({
    msg: `Hello ${req.user.username}`,
    secret: `You are now authorized and you lucky no. is ${luckyNumber}`,
  })
}

module.exports = { login, dashboard }
