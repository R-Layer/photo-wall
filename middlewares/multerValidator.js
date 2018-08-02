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

validationFile = (req, res, next) => {
  upload(req, res, err => {
    if (err) {
      return res.status(422).json({
        err: {
          message: "Incorrect field(s)",
          image: { message: "File size exceeded - max 2MB" }
        }
      });
    } else {
      // Credits to Krzysztof Sztompka [STACK OVERFLOW]
      if (req.validationFileError) {
        return res.status(422).json({
          err: {
            message: "Incorrect field(s)",
            image: { message: "Wrong file type - Only jpeg / png allowed" }
          }
        });
      } else {
        req.app.locals.path = req.file.path;
        next();
      }
    }
  });
};

module.exports = validationFile;
