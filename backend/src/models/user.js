const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true, min: 3, max: 20 },
    lastName: { type: String, required: true, trim: true, min: 3, max: 20 },
    userName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    hash_password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "admin",
    },
    contact: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
  },
  { timestamps: true }
);

User.virtual("password").set(function (password) {
  this.hash_password = bcrypt.hashSync(password, 10);
});

User.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

User.methods = {
  authenticate: function (password) {
    return bcrypt.compareSync(password, this.hash_password);
  },
};
module.exports = mongoose.model("User", User);
