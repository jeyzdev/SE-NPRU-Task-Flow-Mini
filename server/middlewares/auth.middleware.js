const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require("dotenv").config();

const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).send({
        message: "Unauthorized - No token provided.",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid token." });
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).send({
        message: "User not found.",
      });
    }
    req.user = user;
    next();
  } catch (e) {
    res
      .status(500)
      .send({ message: "Internal Server Error while checking token." });
  }
};

const authMiddleware = {
  protectedRoute,
};

module.exports = authMiddleware;
