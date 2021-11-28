const { StatusCodes } = require('http-status-codes')
const { CustomAPIError } = require('../errors/')
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send('Something went wrong try, please again later')
}

module.exports = errorHandlerMiddleware
