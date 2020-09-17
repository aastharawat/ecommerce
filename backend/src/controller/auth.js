const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.signUp = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) return res.status(400).json({ message: "USer already exists" });
  });

  const newUser = new User(req.body);
  newUser.save((err, data) => {
    if (data) {
      return res.status(201).json({
        message: "User created",
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
  console.log(req.body);
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRETKEY, {
          expiresIn: "1h",
        });
        const { firstName, lastName, email, role, fullName } = user;
        res.status(200).json({
          token,
          user: { firstName, lastName, email, role, fullName },
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
