const express = require("express");
const route = express.Router();
const { signUp, signIn } = require("../controller/auth");

route.post("/signIn", signIn);

route.post("/signUp", signUp);

module.exports = route;
