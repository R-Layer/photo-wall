const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cardSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
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

cardSchema.statics.toggleLike = function toggleLike(cardId, userId) {
  return this.findOne({ _id: cardId })
    .exec()
    .then(card => {
      let userIdString = userId.toString();
      if (card.likesArray.includes(userIdString)) {
        return this.findByIdAndUpdate(
          cardId,
          {
            $pull: { likesArray: userIdString }
          },
          { new: true }
        );
      } else {
        return this.findByIdAndUpdate(
          cardId,
          {
            $push: { likesArray: userIdString }
          },
          { new: true }
        );
      }
    })
    .catch(err => err);
};

module.exports = mongoose.model("Card", cardSchema);
