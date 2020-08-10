const dotenv = require('dotenv').config()

const mongoUrl = process.env.MONGODB_URI
PORT = process.env.PORT
module.exports = {
    mongoUrl,
    PORT
}