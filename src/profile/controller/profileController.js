const User = require("../models/User");
const File = require("../models/File");
const fs = require("fs");
const generateToken = require("../../helpers");
class profileController {
  async updateData(req, res) {
    try {
      const { name, surname } = req.body;
      console.log(name, surname);
      await User.findOneAndUpdate(
        { _id: req.body.user._id },
        { $set: { name: name, surname: surname } }
      );
      const updatedUser = await User.findOne({ _id: req.body.user._id });
      const token = generateToken(updatedUser._id);
      return res.status(200).json({
        message: "User data successfully saved",
        token: token,
        user: {
          email: updatedUser.email,
          regDate: updatedUser.regDate,
          name: updatedUser.name,
          surname: updatedUser.surname,
        },
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: "Updating data failed" });
    }
  }
  async uploadAvatar(req, res) {
    try {
      const uploadFile = req.files.file;
      const id = req.body.user._id;
      const type = uploadFile.name.split(".").pop();
      const newFilename = id + "." + type;
      const path = `./clientFiles/${id}/${newFilename}`;
      uploadFile.mv(path, function (err) {
        if (err) {
          return res.status(500).send(err);
        }
      });
      const file = await File.findOne({ user_id: id });
      if (!file) {
        const user = await User.findOne({ _id: id });
        const file = new File({
          name: newFilename,
          type: type,
          path: path,
          user_id: id,
        });
        await file.save();
        user.photo = file._id;
        await user.save();
        const readStream = fs.createReadStream(file.path);
        readStream.pipe(res);
        return;
      }
      file.name = newFilename;
      file.type = type;
      file.path = path;
      await file.save();
      const readStream = fs.createReadStream(path);
      readStream.pipe(res);
      return;
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: "Uploading failed" });
    }
  }
  async loadAvatar(req, res) {
    try {
      const id = req.body.user._id;
      const photo = await File.findOne({ user_id: id });
      const readStream = fs.createReadStream(photo.path);
      readStream.pipe(res);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Loading failed" });
    }
  }
}

module.exports = new profileController();
