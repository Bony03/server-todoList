const Router = require("express");
const router = new Router();
const controller = require("../controllers/authController");
const checkTokenMiddlewere = require("../middlewere/checkTokenMiddlewere");

router.post("/registration", controller.registration);
router.post("/login", controller.login);
router.put("/change-password", checkTokenMiddlewere, controller.changePassword);
router.get("/checkToken", checkTokenMiddlewere, controller.checkToken);
module.exports = router;
