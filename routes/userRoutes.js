const express = require("express");

const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const configVars = require("../config/keys");
const User = require("../models/userModel");
//const authMW = require("../middlewares/auth");
const validMW = require("../middlewares/joiValidator");

const {
  users_get_all,
  users_get_one,
  users_create_one,
  users_authentication,
  users_update_self,
  users_delete_self
} = require("../controllers/userControllers");

const router = express.Router();

router.get("/", users_get_all);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  users_get_one
);
router.post("/signup", validMW, users_create_one);
router.post("/login", validMW, users_authentication);
router.patch(
  "/update",
  validMW,
  passport.authenticate("jwt", { session: false }),
  users_update_self
);
router.delete(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  users_delete_self
);

router.get(
  "/auth/github",
  passport.authenticate("github", { scope: "user", session: false })
);

router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "http://localhost:3000/login",
    session: false
  }),
  (req, res) => {
    User.findOne({ email: req.user.email })
      .exec()
      .then(user => {
        if (user) {
          const token = jwt.sign(
            {
              name: user.name,
              id: user._id,
              location: user.location,
              email: user.email
            },
            configVars.JWT_SECRET,
            { expiresIn: "1h" }
          );
          res.redirect("http://localhost:3000/providerLog?" + token);
          /*           res.status(200).json({
            message: "Auth successful",
            token
          }); */
        } else {
          bcrypt
            .hash(req.user.password, 10)
            .then(hashed => {
              const newUser = new User({
                name: req.user.name,
                location: req.user.location,
                email: req.user.email,
                passwordHash: hashed
              });
              newUser
                .save()
                .then(userCreated =>
                  res.status(201).json({
                    message: "User successfully created",
                    newUser: {
                      name: userCreated.name,
                      location: userCreated.location,
                      email: userCreated.email
                    }
                  })
                )
                .catch((
                  err // Error during the saving
                ) =>
                  res.status(500).json({
                    message: "Error: user registration failed",
                    err
                  })
                );
            })
            .catch((
              err // Error during hashing of password
            ) =>
              res.status(500).json({
                message: "Error: user registration failed",
                err
              })
            );
        }
      });
  }
);

module.exports = router;
