const express = require("express");

const authMW = require("../middlewares/auth");
const validMW = require("../middlewares/validator");

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
router.get("/:id", users_get_one);
router.post("/signup", validMW, users_create_one);
router.post("/login", validMW, users_authentication);
router.patch("/update", validMW, authMW, users_update_self);
router.delete("/delete", authMW, users_delete_self);

module.exports = router;
