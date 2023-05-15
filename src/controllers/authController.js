const User = require("../models/User");
const File = require("../models/File");
const fs = require("fs");
const bcrypt = require("bcrypt");
const generateToken = require("../../helpers");

class authController {
  async registration(req, res) {
    try {
      const { email, password } = req.body;
      const candidate = await User.findOne({ email: email });
      if (candidate) {
        return res.status(400).json({ message: "User have already exists!" });
      }
      const hasPassword = bcrypt.hashSync(password, 10);
      const user = new User({
        email,
        password: hasPassword,
        regDate: Date.now(),
      });
      await user.save();
      const token = generateToken(user._id);
      fs.mkdirSync(`./clientFiles/${user._id}`);
      return res.status(200).json({
        message: "User successfully registered",
        token,
        user: {
          email: user.email,
          regDate: user.regDate,
        },
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: "Server Error! Registration failed" });
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const candidate = await User.findOne({ email: email });
      if (!candidate) {
        return res.status(400).json({ message: "User does not exist" });
      }
      const isMatch = bcrypt.compareSync(password, candidate.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Password is incorrect" });
      }
      const token = generateToken(candidate._id);
      return res.status(200).json({
        message: "User successfully logined",
        token,
        user: {
          email: candidate.email,
          regDate: candidate.regDate,
          name: candidate.name,
          surname: candidate.surname,
          todos: candidate.todos,
          photo: candidate.photo,
        },
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: "Login failed" });
    }
  }
  async changePassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;
      const candidate = await User.findOne({ _id: req.body.user._id });
      const isMatch = bcrypt.compareSync(oldPassword, candidate.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Old password is incorrect" });
      }
      const token = generateToken(candidate._id);
      const hasPassword = bcrypt.hashSync(newPassword, 10);
      candidate.password = hasPassword;
      candidate.save();

      return res
        .status(200)
        .json({ message: "Password changed successfully", token });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: "Change password failed" });
    }
  }
  async checkToken(req, res) {
    const id = req.body.user._id;
    const token = generateToken(id);
    const candidate = await User.findOne({ _id: id });
    return res.status(200).json({
      token,
      user: {
        email: candidate.email,
        regDate: candidate.regDate,
        name: candidate.name,
        surname: candidate.surname,
        todos: candidate.todos,
        photo: candidate.photo,
      },
    });
  }
}

module.exports = new authController();
