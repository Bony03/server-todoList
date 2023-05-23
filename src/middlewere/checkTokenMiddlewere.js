const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    console.log(req.headers.authorization, req.body);
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "User not logged in" });
    }
    const decodedData = jwt.verify(token, process.env.SECRET_KEY);
    req.body.user = decodedData;
    next();
  } catch (e) {
    console.log(e.message);
    return res.status(403).json({ message: "Token is not valid" });
  }
};
