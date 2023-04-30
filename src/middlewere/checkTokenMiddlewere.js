const jwt = require("jsonwebtoken");
const { secret } = require("../../config");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "User not logged in" });
    }
    const decodedData = jwt.verify(token, secret);
    req.body.user = decodedData;
    next();
  } catch (e) {
    console.log(e.message);
    return res.status(403).json({ message: "Token is not valid" });
  }
};
