const User = require("../models/User");
const Itinerary = require("../models/Itinerary");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const myError = (res, err) => {
  res.json({ success: false, response: err.message });
};

const usersControllers = {
  createUser: async (req, res) => {
    const { first_name, last_name, email, password, img, country, google } =
      req.body;
    const pw = bcrypt.hashSync(password);
    try {
      if (await User.findOne({ email: email })) {
        throw new Error("Email already in use, try another one");
      }
      const newUser = new User({
        first_name,
        last_name,
        email,
        password: pw,
        img,
        country,
        google,
      });
      await newUser.save();
      const token = jwt.sign({ ...newUser }, process.env.SECRETORKEY, {
        expiresIn: "1h",
      });
      res.json({
        success: true,
        user: {
          first_name: newUser.first_name,
          img: newUser.img,
          id: newUser._id,
          token,
        },
      });
    } catch (err) {
      myError(res, err);
    }
  },

  getUsers: async (req, res) => {
    try {
      let users = await User.find();
      res.json({ success: true, response: users });
    } catch (err) {
      myError(res, err);
    }
  },

  updateUser: async (req, res) => {
    try {
      let user = await User.findOneAndUpdate(
        { _id: req.body.id },
        { ...req.body },
        { new: true }
      );
      res.json({ success: true, modified: user });
    } catch (err) {
      myError(res, err);
    }
  },

  deleteUser: async (req, res) => {
    try {
      await User.findOneAndDelete({ _id: req.body.id });
      res.json({ success: true });
    } catch (err) {
      myError(res, err);
    }
  },

  logUser: async (req, res) => {
    const { email, password, google } = req.body;
    try {
      let user = await User.findOne({ email: email });
      if (user.google && !google)
        throw new Error("You must log in with Google");
      let match = user && bcrypt.compareSync(password, user.password);
      if (!user || !match) throw new Error();
      const token = jwt.sign({ ...user }, process.env.SECRETORKEY, {
        expiresIn: 3600,
      });
      res.json({
        success: true,
        user: {
          first_name: user.first_name,
          img: user.img,
          id: user._id,
          token,
        },
      });
    } catch (err) {
      myError(res, err);
    }
  },

  verifyToken: async (req, res) => {
    res.json({ success: true, user: req.user });
  },

  like: async (req, res) => {
    const { bool, id } = req.body;
    try {
      await Itinerary.findOneAndUpdate(
        { _id: id },
        bool
          ? {
              $inc: { "likes.likes": 1 },
              $push: { "likes.users": req.user._id },
            }
          : {
              $inc: { "likes.likes": -1 },
              $pull: { "likes.users": req.user._id },
            },
        { new: true }
      );
      res.json({
        success: true,
      });
    } catch (err) {
      myError(res, err);
    }
  },

  comment: async (req, res) => {
    const { comment, id } = req.body;
    try {
      await Itinerary.findOneAndUpdate(
        { _id: id },
        {
          $push: { comments: { user: req.user._id, comment: comment } },
        },
        { new: true }
      );
      res.json({
        success: true,
      });
    } catch (err) {
      myError(res, err);
    }
  },
};

module.exports = usersControllers;
