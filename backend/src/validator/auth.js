const { check, validationResult } = require("express-validator");

exports.validateSignUp = [
  check("firstName").notEmpty().withMessage("Firstname required."),
  check("lastName").notEmpty().withMessage("Lastname required."),
  check("email").isEmail().withMessage("Valid email required."),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password of minimum length 6 required."),
];

exports.validateSignIn = [
  check("email").isEmail().withMessage("Valid email required."),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password of minimum length 6 required."),
];

exports.isRequestValid = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array() });
  }
  next();
};
