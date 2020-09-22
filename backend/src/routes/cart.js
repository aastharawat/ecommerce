const express = require("express");
const { requireSignIn, isUser } = require("../controller/auth");
const route = express.Router();
const { addItemToCart } = require("../controller/cart");

route.post("/user/cart/addToCart", requireSignIn, isUser, addItemToCart);

module.exports = route;
