const Card = require("../models/cardModel");

exports.cards_get_all = (req, res) => {
  Card.find({})
    .exec()
    .then(cards => {
      if (cards.length > 0) {
        res.status(200).json({ message: "Cards fetched correctly", cards });
      } else {
        res.status(404).json({ err: { messge: "No cards found" } });
      }
    })
    .catch(err =>
      res.status(500).json({ message: "Error: card fetch failed", err })
    );
};

exports.cards_create_card = (req, res) => {
  Card.findOne({ imageName: req.body.imageStatus.imageName }).then(result => {
    if (result) {
      res.status(409).json({ err: { message: "Card name already exists" } });
    } else {
      console.log("card", JSON.parse(req.body.imageStatus));
      const body = JSON.parse(req.body.imageStatus);
      new Card({
        imageURL: req.app.locals.path,
        imageName: body.imageName,
        imageTagline: body.tagline
      })
        .save()
        .then(newCard =>
          res.status(201).json({ message: "Card created", newCard })
        )
        .catch(err =>
          res.status(500).json({ message: "Error: card creation failed", err })
        );
    }
  });
};
