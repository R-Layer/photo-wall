const joi = require("joi").defaults(schema =>
  schema.options({ abortEarly: false })
);

const loginValidator = joi.object().keys({
  email: joi
    .string()
    .email()
    .required(),
  password: joi.string().required()
});

const signupValidator = joi.object().keys({
  name: joi.string().min(3),
  email: joi
    .string()
    .email()
    .required(),
  location: joi
    .string()
    .required()
    .min(2),
  password: joi
    .string()
    .min(3)
    .required(),
  // CREDITS TO GERGO ERDOSI [STACK OVERFLOW]
  password2: joi
    .any()
    .valid(joi.ref("password"))
    .required()
    .options({
      language: {
        any: {
          allowOnly: "must match password"
        }
      }
    })
});

const updateValidator = joi.object().keys({
  name: joi
    .string()
    .min(3)
    .required(),
  email: joi
    .string()
    .email()
    .required(),
  location: joi
    .string()
    .min(2)
    .required(),
  oldPassword: joi.string().allow(""),
  newPassword: joi
    .string()
    .min(3)
    .allow(""),
  password2: joi
    .string()
    .valid(joi.ref("newPassword"))
    .options({ language: { any: { allowOnly: "must match new password" } } })
});

const validator = (req, res, next) => {
  let dataToValidate;
  switch (req.url) {
    case "/login":
      dataToValidate = loginValidator;
      break;
    case "/signup":
      dataToValidate = signupValidator;
      break;
    case "/update":
      dataToValidate = updateValidator;
      break;
    default:
      dataToValidate = null;
      break;
  }

  joi.validate(req.body, dataToValidate, (err, value) => {
    if (err) {
      res.status(422).json({
        err: Object.assign({}, err, { message: "Incorrect field(s)" })
      });
    } else {
      req.app.locals.userData = value;
      next();
    }
  });
};

module.exports = validator;
