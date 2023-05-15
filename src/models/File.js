const { model, Schema, ObjectId } = require("mongoose");

const File = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  path: { type: String, default: "" },
  user_id: { type: ObjectId, ref: "User" },
});

module.exports = model("File", File);
