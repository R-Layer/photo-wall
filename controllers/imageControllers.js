const multer = require("multer");

// Storage options
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

// File Filter options
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    return cb(null, true);
  } else {
    // Credits to Krzysztof Sztompka [STACK OVERFLOW]
    req.validationFileError = "File rejected";
    return cb(null, false, req.validationFileError);
  }
};

// upload init with storage and file filter
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2
  },
  fileFilter: fileFilter
}).single("photo");

exports.images_create_card = (req, res) => {
  upload(req, res, err => {
    console.log("image", req.file);
    console.log("body", JSON.parse(req.body.photoStatus));
    if (err) {
      return res.status(422).json({ err: { message: "File too big!" } });
    } else {
      // Credits to Krzysztof Sztompka [STACK OVERFLOW]
      if (req.validationFileError) {
        return res.status(422).json({ err: { message: "File not valid" } });
      }
      res.status(200).json({ message: "ok" });
    }
  });
};
