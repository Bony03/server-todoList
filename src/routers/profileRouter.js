const Router = require("express");
const profileRouter = new Router();
const controller = require("../controllers/profileController");
const checkTokenMiddlewere = require("../middlewere/checkTokenMiddlewere");

profileRouter.put("/userinfo", checkTokenMiddlewere, controller.updateData);
profileRouter.post("/upload", checkTokenMiddlewere, controller.uploadAvatar);
profileRouter.get("/load", checkTokenMiddlewere, controller.loadAvatar);
module.exports = profileRouter;
