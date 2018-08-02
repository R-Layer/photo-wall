const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cardSchema = new Schema({
  imageURL: {
    type: String,
    required: true
  },
  imageName: {
    type: String,
    required: true,
    unique: true
  },
  imageTagline: {
    type: String,
    required: true
  },
  likesArray: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model("Card", cardSchema);
