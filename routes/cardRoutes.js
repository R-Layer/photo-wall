const express = require("express");
const validMW = require("../middlewares/joiValidator");
const fileValidMW = require("../middlewares/multerValidator");

const {
  cards_create_card,
  cards_get_all
} = require("../controllers/cardControllers");

const router = express.Router();

router.get("/", cards_get_all);
router.post("/upload", fileValidMW, validMW, cards_create_card);

module.exports = router;
