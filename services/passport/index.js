import dotenv from 'dotenv'
dotenv.config()
import passport from 'passport'
import User from '../../models/user/index.js'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import { Strategy as LocalStrategy } from 'passport-local'

const localOptions = {
  usernameField: 'email',
}

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ email }, (err, user) => {
    console.log('user', user)
    if (err) {
      return done(err)
    }
    if (!user) {
      return done(null, false)
    }
    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        return done(err)
      }
      if (!isMatch) {
        return done(null, false)
      }

      return done(null, user)
    })
  })
})

// setup options for jwt strategy

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.SECRET_STRING,
}

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub, (err, user) => {
    if (err) {
      return done(err, false)
    }

    if (user) {
      return done(null, user)
    } else {
      return done(null, false)
    }
  })
})

passport.use(jwtLogin)
passport.use(localLogin)

export default passport
