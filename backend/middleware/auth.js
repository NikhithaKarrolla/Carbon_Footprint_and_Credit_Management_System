// middleware/auth.js
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ msg: "No token" });

  const decoded = jwt.verify(token, "secretkey");

  req.user = decoded;
  next();
};