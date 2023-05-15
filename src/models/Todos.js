const { Schema, model, ObjectId } = require("mongoose");

const Todos = new Schema({
  todos: { type: Array, required: true },
  user_id: { type: ObjectId, ref: "User" },
});

module.exports = model("Todos", Todos);
