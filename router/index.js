import Authentication from '../controllers/authentication/index.js'
import passport from '../services/passport/index.js'
// import passport from 'passport'

const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

export default (app) => {
  app.get('/', requireAuth, (req, res) => {
    res.send({ hi: 'there' })
  })
  app.post('/signin', requireSignin, Authentication.signin)
  app.post('/signup', Authentication.signup)
}
