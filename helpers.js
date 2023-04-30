const jwt = require("jsonwebtoken");
const { secret } = require("./config");
const generateToken = (_id) => {
  payload = {
    _id,
  };
  return jwt.sign(payload, secret, { expiresIn: "1h" });
};

module.exports = generateToken;
