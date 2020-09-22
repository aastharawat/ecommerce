const express = require("express");
const { get } = require("mongoose");
const { isAdmin, requireSignIn } = require("../controller/auth");
const route = express.Router();
const { addCategory, getCategories } = require("../controller/category");

const multer = require("multer");
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
  "/category/create",
  requireSignIn,
  isAdmin,
  upload.single("categoryImg"),
  addCategory
);
route.get("/category/fetch", getCategories);

module.exports = route;
