const express = require("express");
const passport = require("passport");

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

router.get("/auth/github", passport.authenticate("github"));

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function(req, res) {
    console.log("req", req.user);
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

module.exports = router;
