const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.signUp = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) return res.status(400).json({ message: "USer already exists" });
  });
  const {
    firstName,
    lastName,
    userName,
    email,
    password,
    role,
    contact,
  } = req.body;
  const newUser = new User({
    firstName,
    lastName,
    userName,
    email,
    password,
    role,
    contact,
  });
  newUser.save((err, data) => {
    if (data) {
      return res.status(201).json({
        message: "Created!",
        user: data,
      });
    } else {
      return res.status(400).json({
        message: err,
      });
    }
  });
};

exports.signIn = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRETKEY,
          {
            expiresIn: "1d",
          }
        );
        const { firstName, email, role, fullName } = user;
        res.status(200).json({
          token,
          user: { role, firstName, email, fullName },
        });
      } else {
        res.status(400).json(err);
      }
    }
    if (err) {
      res.status(400).json({
        message: "Invalid user. Try again with different credentials",
      });
    }
  });
};

exports.requireSignIn = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRETKEY);
    req.user = user;
  } else {
    res.status(500).json({ message: "token required" });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    res.status(400).json({ message: "Admin access denied" });
  }
  next();
};

exports.isUser = (req, res, next) => {
  if (req.user.role !== "user") {
    res.status(400).json({ message: "User access denied" });
  }
  next();
};
