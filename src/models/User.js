const { Schema, model, ObjectId } = require("mongoose");

const User = new Schema({
  name: { type: String, required: false },
  surname: { type: String, required: false },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  regDate: { type: Number, required: true },
  todos: { type: ObjectId, ref: "Todos" },
  photo: { type: ObjectId, ref: "File" },
  activateID: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
});

module.exports = model("User", User);
