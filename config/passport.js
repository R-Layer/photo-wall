var GitHubStrategy = require("passport-github").Strategy;

const jwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("./../models/userModel");
const configVars = require("./keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = configVars.JWT_SECRET;

module.exports = passport => {
  passport.use(
    new jwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          } else {
            return done(new Error("404 - user not found"), false);
          }
        })
        .catch(err =>
          res.status(500).json({ err: { message: "Passport error", err } })
        );
    })
  );

  passport.use(
    new GitHubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:3000/auth/github/callback"
      },
      function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ githubId: profile.id }, function(err, user) {
          return cb(err, user);
        });
      }
    )
  );
};
