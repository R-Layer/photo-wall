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
      if (card.likesArray.includes(userId)) {
        return this.findByIdAndUpdate(cardId, {
          $pull: { likesArray: userId }
        });
      } else {
        return this.findByIdAndUpdate(cardId, {
          $push: { likesArray: userId }
        });
      }
    })
    .catch(err => err);
};

module.exports = mongoose.model("Card", cardSchema);

/* 

books_addApplicant = (bookId, userId) => {
  Book.findByIdAndUpdate(bookId, {
    $push: { "bookStatus.applicants": userId },
    "bookStatus.pending": true
  }).then(appAdd => appAdd);
};

books_removeApplicant = (bookId, userId) => {
  Book.findByIdAndUpdate(bookId, {
    $pull: { "bookStatus.applicants": userId }
  }).then(appRem => appRem);
};

*/
