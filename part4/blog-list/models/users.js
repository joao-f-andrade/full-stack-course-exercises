const mongoose = require('mongoose')

const { Schema, Mongoose } = require('mongoose')

const userSchema = new Schema({
  username: String,
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    document.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.mode('User', userSchema)

module.exports = User