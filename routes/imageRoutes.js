const express = require("express");
const validMW = require("../middlewares/joiValidator");
const fileValidMW = require("../middlewares/multerValidator");

const { images_create_card } = require("../controllers/imageControllers");

const router = express.Router();

router.post("/upload", fileValidMW, validMW, images_create_card);

module.exports = router;
