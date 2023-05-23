require("dotenv").config();
const jwt = require("jsonwebtoken");
const generateToken = (_id, period = "1h") => {
  payload = {
    _id,
  };
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: period });
};

module.exports = generateToken;
