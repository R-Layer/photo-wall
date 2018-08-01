const ObjectID = require("mongoose").Types.ObjectId;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");

const configVars = require("../config/keys");

exports.users_get_all = (req, res) => {
  User.find({}, "username _id email")
    .exec()
    .then(users =>
      res.status(200).json({
        message: "Users fetched correctly",
        users
      })
    )
    .catch(err =>
      res.status(500).json({
        message: "Error: users fetch failed",
        err
      })
    );
};

exports.users_get_one = (req, res) => {
  let idTest = "";
  try {
    idTest = new ObjectID(req.params.id);
  } catch (err) {
    idTest = "failed";
  }
  // Credits to andyMacleod [STACK OVERFLOW]
  let rdParam =
    idTest.toString() === req.params.id
      ? { _id: idTest }
      : { email: req.params.id };

  User.findOne(rdParam, "username _id email")
    .exec()
    .then(user => {
      if (user) {
        res.status(200).json({
          message: "User fetched correctly",
          user
        });
      } else {
        res.status(404).json({
          message: "User not found",
          user
        });
      }
    })
    .catch(err =>
      res.status(500).json({
        message: "Error: user fetch failed",
        err
      })
    );
};

exports.users_create_one = (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (user) {
        res.status(409).json({ err: { message: "Email already in use" } });
      } else {
        bcrypt
          .hash(req.body.password, 10)
          .then(hashed => {
            const newUser = new User({
              name: req.body.name,
              location: req.body.location,
              email: req.body.email,
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
    }) // Error during research of email
    .catch(err =>
      res.status(500).json({
        message: "Error: user registration failed",
        err
      })
    );
};

exports.users_delete_self = (req, res) => {
  User.findByIdAndDelete(req.app.locals.userAuth.id)
    .select("name email defaultLocation")
    .exec()
    .then(removedItem => {
      if (removedItem) {
        res.status(200).json({
          message: `User <${removedItem.name}> removed`,
          removedItem
        });
      } else {
        res.status(404).json({
          err: { message: "User not found" }
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Error: user removal failed",
        err
      });
    });
};

exports.users_update_self = (req, res) => {
  // Update procedure, triggered only if actual credentials are valid (see below)
  const updateProcedure = () => {
    // New user object, needed because of rehashing password ( it is not possible to use the body request directly to update the document)
    bcrypt.hash(req.body.newPassword, 10).then(hashed => {
      const updatedUserData = {
        name: req.body.name,
        location: req.body.location,
        email: req.body.email,
        passwordHash: hashed
      };

      User.findByIdAndUpdate(
        req.app.locals.userAuth.id,
        { $set: updatedUserData },
        { new: true, runValidators: true }
      )
        .exec()
        .then(userUpdated => {
          // If update is successful it's created and sent back a new token with the updated informations
          if (userUpdated) {
            const token = jwt.sign(
              {
                name: userUpdated.name,
                id: userUpdated._id,
                location: userUpdated.location,
                email: userUpdated.email
              },
              configVars.JWT_SECRET,
              { expiresIn: "1h" }
            );
            res.status(200).json({
              message: "User updated successfully",
              token
            });
          } else {
            // this else clause shouldn't be triggered unless the token has been modified ( not valid anymore then)
            res.status(404).json({
              err: { message: "User not found" }
            });
          }
        })
        .catch(err => {
          res.status(500).json({
            message: "Error: update failed",
            err
          });
        });
    });
  };

  // It will check for the old password validity only if a change password is required ( the new password can't be an empty string due to validation), otherwise it will start the update procedure directly
  if (req.body.newPassword === "") {
    updateProcedure();
  } else {
    User.findById(req.app.locals.userAuth.id)
      .then(user => {
        bcrypt.compare(req.body.oldPassword, user.passwordHash).then(result => {
          if (result) {
            updateProcedure();
          } else {
            // Created a Joi error consistent because Joi package is in charge for  the validation errors
            res.status(422).json({
              err: {
                message: "Incorrect field(s)",
                isJoi: true,
                details: [
                  {
                    context: { key: "oldPassword" },
                    message: "Wrong old password"
                  }
                ]
              }
            });
          }
        });
      })
      .catch(err => res.status(500).json({ message: "Error password", err }));
  }
};

exports.users_authentication = (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (user) {
        bcrypt
          .compare(req.body.password, user.passwordHash)
          .then(result => {
            if (result) {
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
              res.status(200).json({
                message: "Auth successful",
                token
              });
            } else {
              res.status(401).json({
                err: { message: "Auth failed" } // Password doesn't match
              });
            }
          })
          .catch(err =>
            res.status(500).json({
              message: "Error: authentication process failed", // Fail during bcrypt.compare
              err
            })
          );
      } else {
        res.status(401).json({
          err: { message: "Auth failed" } // Email not found
        });
      }
    })
    .catch(err =>
      res.status(500).json({
        message: "Error: authentication process failed", // Fail retrieving the email
        err
      })
    );
};
