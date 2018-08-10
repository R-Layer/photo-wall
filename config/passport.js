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
        clientID: configVars.GITHUB_CLIENT_ID,
        clientSecret: configVars.GITHUB_CLIENT_SECRET
        /*         callbackURL: "/api/users/auth/github/callback" */
      },
      function(accessToken, refreshToken, profile, callback) {
        const data = {
          name: profile.username || "Jhon doe",
          location: profile.location || "Earth",
          email: profile.profileUrl || "a@b.c",
          password: profile._json.node_id || "123"
        };
        return callback(null, data);
      }
    )
  );
};
