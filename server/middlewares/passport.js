const passport = require('passport');
const passportJwt = require('passport-jwt');

const { ExtractJwt } = passportJwt;
const StrategyJwt = passportJwt.Strategy;
const User = require('../models/user');

passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_KEY,
    },
    ((jwtPayload, done) => User.findOne({ where: { id: jwtPayload.id } })
      .then((user) => done(null, user))
      .catch((err) => done(err)))
  )
);
