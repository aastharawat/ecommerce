const express = require("express");
const route = express.Router();
const { signUp, signIn, requireSignIn } = require("../controller/auth");
const {
  validateSignIn,
  validateSignUp,
  isRequestValid,
} = require("../validator/auth");

route.post("/signIn", validateSignIn, isRequestValid, signIn);

route.post("/signUp", validateSignUp, isRequestValid, signUp);

route.post("/profile", requireSignIn, (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = route;
