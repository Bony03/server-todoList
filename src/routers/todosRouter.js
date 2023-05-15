const Router = require("express");
const todosRouter = new Router();
const controller = require("../controllers/todosController");
const checkTokenMiddlewere = require("../middlewere/checkTokenMiddlewere");

todosRouter.post("/save", checkTokenMiddlewere, controller.saveTodos);
todosRouter.get("/", checkTokenMiddlewere, controller.getTodos);
module.exports = todosRouter;
