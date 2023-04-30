const User = require("../models/User");
const Todos = require("../models/Todos");
const generateToken = require("../../helpers");

class profileController {
  async saveTodos(req, res) {
    try {
      const token = generateToken(req.body.user._id);
      const todos = req.body.todos;
      if (!todos.length) {
        return res
          .status(400)
          .json({ message: "Todos is empty", token: token });
      }
      const todosID = await Todos.findOne({ user_id: req.body.user._id });
      if (todosID) {
        todosID.todos = todos;
        await todosID.save();
        return res
          .status(200)
          .json({ message: "Todos saved successfully", token: token });
      }
      const todosInstance = new Todos({
        todos,
        user_id: req.body.user._id,
      });
      await todosInstance.save();
      await User.updateOne(
        { _id: req.body.user._id },
        { $set: { todos: { $ref: Todos, _id: todosInstance._id } } }
      );
      return res
        .status(200)
        .json({ message: "Todos saved successfully", token: token });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Server error" });
    }
  }
  async getTodos(req, res) {
    const token = generateToken(req.body.user._id);
    const todos = await Todos.findOne({ user_id: req.body.user._id });
    if (todos) {
      return res.status(200).json({
        message: "Todos successfully loaded",
        todos: todos.todos,
        token: token,
      });
    }
    return res.status(404).json({ message: "No saved todos" });
  }
}

module.exports = new profileController();
