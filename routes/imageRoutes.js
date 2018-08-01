const express = require("express");
const { images_create_card } = require("../controllers/imageControllers");

const router = express.Router();

router.post("/upload", images_create_card);

module.exports = router;
