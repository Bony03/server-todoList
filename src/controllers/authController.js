const User = require("../models/User");
const fs = require("fs");
const bcrypt = require("bcrypt");
const generateToken = require("../../helpers");
const mailService = require("../services/mailService");
const { randomUUID } = require("crypto");
class authController {
  async registration(req, res) {
    try {
      const { email, password } = req.body;
      const candidate = await User.findOne({ email: email });
      if (candidate) {
        return res.status(400).json({ message: "User have already exists!" });
      }
      const hasPassword = bcrypt.hashSync(password, 10);
      const activateID = randomUUID();
      const user = new User({
        email,
        password: hasPassword,
        regDate: Date.now(),
        activateID,
      });
      await user.save();
      const token = generateToken(user._id);
      fs.mkdirSync(`./clientFiles/${user._id}`);
      mailService.sendActivationMessage(
        user.email,
        `${process.env.API_URL}/auth/activate/${activateID}`
      );
      return res.status(200).json({
        message: "User successfully registered",
        token,
        user: {
          email: user.email,
          regDate: user.regDate,
          isActivated: user.isActivated,
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
          isActivated: candidate.isActivated,
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
        isActivated: candidate.isActivated,
      },
    });
  }
  async requestResetPassword(req, res) {
    try {
      const email = req.body.email;
      const user = await User.findOne({ email });
      if (user) {
        const token = generateToken(user.id, 6000);
        mailService.sendResetMessage(
          email,
          `${process.env.SITE_URL}/reset-password/${token}`
        );
        return res
          .status(200)
          .json({ message: "Email with recovery link successfully sent" });
      }
      return res.status(400).json({ message: "User does not exist" });
    } catch (error) {
      console.log(error.message);
    }
  }
  async resetPassword(req, res) {
    try {
      const candidate = await User.findOne({ _id: req.body.user._id });
      const token = generateToken(candidate._id);
      const hasPassword = bcrypt.hashSync(req.body.password, 10);
      candidate.password = hasPassword;
      await candidate.save();
      return res
        .status(200)
        .json({ message: "Password successfully changed", token });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: "Change password failed" });
    }
  }

  async activate(req, res) {
    try {
      const activateID = req.params.id;
      const user = await User.findOne({ activateID: activateID });
      if (user) {
        if (user.isActivated === true) {
          return res.redirect(`${process.env.SITE_URL}/`);
        }
        user.isActivated = true;
        await user.save();
        return res.redirect(`${process.env.SITE_URL}/activated/`);
      }
      return res.redirect(`${process.env.SITE_URL}/${activateID}`);
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = new authController();
