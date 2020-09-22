const express = require("express");
const { isAdmin, requireSignIn } = require("../controller/auth");
const route = express.Router();
const multer = require("multer");
const { addProduct } = require("../controller/product");
const shortid = require("shortid");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage });

route.post(
  "/product/create",
  requireSignIn,
  isAdmin,
  upload.array("productPicture"),
  addProduct
);

module.exports = route;
