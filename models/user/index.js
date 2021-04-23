import mongoose from 'mongoose'
const Schema = mongoose.Schema
import bcrypt from 'bcrypt'

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
})

userSchema.pre('save', function (next) {
  const user = this
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err)
    }
    user.password = hash
    next()
  })
})

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return callback(err)
    }
    callback(null, isMatch)
  })
}

const ModelClass = mongoose.model('user', userSchema)

export default ModelClass
