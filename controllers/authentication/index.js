import User from '../../models/user/index.js'
import jwt from 'jwt-simple'

const tokenForUser = (user) => {
  const timeStamp = Date.now()
  return jwt.encode({ sub: user.id, iat: timeStamp }, process.env.SECRET_STRING)
}

const signin = (req, res, next) => {
  console.log('req.user', req.user)
  res.send({ token: tokenForUser(req.user) })
}

const signup = (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: 'You must provide an email and password' })
  }

  User.findOne({ email }, function (err, existingUser) {
    if (err) {
      return next(err)
    }
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' })
    }
    const user = new User({
      email,
      password,
    })
    user.save((err) => {
      if (err) {
        return next(err)
      }
      res.json({ token: tokenForUser(user) })
    })
  })
}

export default {
  signup,
  signin,
}
