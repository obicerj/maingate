const passport = require('passport');
const passportJWT = require('passport-jwt');
const Role = require('../models/role');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const User = require('../models/user');

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

const jwtStrategy = new JWTStrategy(jwtOptions, (jwtPayload, done) => {
  User.findByPk(jwtPayload.id)
  .then(user => {
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
  .catch(err => {
    return done(err, false);
  });
});

passport.use(jwtStrategy);

const authenticateJWT = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {

    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    req.user = user;
    next();
  })(req, res, next);
};

// const authorizeRole = (roles = []) => (req, res, next) => {

//   if (roles.length && !roles.includes(req.user.role)) {
//     return res.status(403).json({ message: 'Forbidden.' });
//   }

//   next();
// }

module.exports = {
  authenticateJWT
};