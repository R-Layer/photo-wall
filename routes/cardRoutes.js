const express = require("express");
const passport = require("passport");

//const authMW = require("../middlewares/auth");
const validMW = require("../middlewares/joiValidator");
const fileValidMW = require("../middlewares/multerValidator");

const {
  cards_delete_card,
  cards_create_card,
  cards_update_card,
  cards_toggle_like,
  cards_get_user_cards,
  cards_get_all
} = require("../controllers/cardControllers");

const router = express.Router();

router.get("/", cards_get_all);
router.get("/:id", cards_get_user_cards);

router.post(
  "/upload",
  passport.authenticate("jwt", { session: false }),
  fileValidMW,
  validMW,
  cards_create_card
);

router.delete(
  "/remove/:id",
  passport.authenticate("jwt", { session: false }),
  cards_delete_card
);

router.patch(
  "/updateCard/:id",
  passport.authenticate("jwt", { session: false }),
  validMW,
  cards_update_card
);
router.patch(
  "/toggleLike",
  passport.authenticate("jwt", { session: false }),
  cards_toggle_like
);
module.exports = router;
