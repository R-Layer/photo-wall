const express = require("express");

const authMW = require("../middlewares/auth");
const validMW = require("../middlewares/joiValidator");
const fileValidMW = require("../middlewares/multerValidator");

const {
  cards_delete_card,
  cards_create_card,
  cards_get_all
} = require("../controllers/cardControllers");

const router = express.Router();

router.get("/", cards_get_all);
router.post("/upload", authMW, fileValidMW, validMW, cards_create_card);
router.delete("/remove/:id", authMW, cards_delete_card);

module.exports = router;
