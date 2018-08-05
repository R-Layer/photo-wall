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
  const body = JSON.parse(req.body.imageStatus);
  Card.findOne({ imageName: body.imageName }).then(result => {
    if (result) {
      res.status(409).json({
        err: {
          message: "Incorrect field(s)",
          isJoi: true,
          details: [
            {
              context: { key: "imageName" },
              message: "Image name already exists"
            }
          ]
        }
      });
    } else {
      new Card({
        owner: req.app.locals.userAuth.id,
        imageURL: req.app.locals.path,
        imageName: body.imageName,
        imageTagline: body.imageTagline
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

exports.cards_delete_card = (req, res) => {
  Card.findById(req.params.id).then(card => {
    if (card.owner.toString() === req.app.locals.userAuth.id) {
      Card.findByIdAndRemove(req.params.id)
        .then(result => {
          if (result) {
            res.status(200).json({ message: "Card deleted correctly", result });
          } else {
            res.status(404).json({ err: { message: "Card not found" } });
          }
        })
        .catch(err => res.status(500).json(err));
    } else {
      res.status(401).json({ err: { message: "Access denied" } });
    }
  });
};

exports.cards_update_card = (req, res) => {
  Card.findById(req.params.id).then(card => {
    if (card.owner.toString() === req.app.locals.userAuth.id) {
      Card.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, runValidators: true }
      )
        .then(updatedCard => {
          if (updatedCard) {
            res
              .status(200)
              .json({ message: "Card updated successfully", updatedCard });
          } else {
            res.status(404).json({ err: { message: "Card not found" } });
          }
        })
        .catch(err => res.status(500).json(err));
    } else {
      res.status(401).json({ err: { message: "Access denied" } });
    }
  });
};

exports.cards_toggle_like = (req, res) => {
  Card.toggleLike(req.body, req.app.locals.userAuth.id)
    .then(el => res.status(200).json(el))
    .catch(err => res.status(500).json(err));
};
