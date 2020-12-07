const User = require("../models/user");
const { validationResult } = require("express-validator");

exports.addInfo = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log("here");
    const error = new Error("Validation Failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const name = req.body.name;
  const location = req.body.location;

  const user = new User({
    name: name,
    location: location,
  });
  user
    .save()
    .then((result) => {
      console.log("User Saved IN Database");
      res.json({ message: "User Saved", result: result });
    })
    .catch((err) => {
      console.log("User Not saved");
      res.status(500).json({ message: "Internal Server Error" });
    });
};

exports.getInfo = (req, res, next) => {
  User.find()
    .then((userData) => {
      res.json(userData);
    })
    .catch((err) => {
      console.log("User Not saved");
      res.status(500).json({ message: "Internal Server Error" });
    });
};

exports.search = (req, res, next) => {
  const { searchQuery } = req.params;
  User.find({
    $or: [
      { name: { $regex: `${searchQuery}`, $options: "ix" } },
      { location: { $regex: `${searchQuery}`, $options: "ix" } },
    ],
  })
    .sort({ name: 1 })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json({ message: "Some Error Occured", err: err });
    });
};
