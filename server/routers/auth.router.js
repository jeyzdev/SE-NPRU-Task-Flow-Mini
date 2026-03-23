const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const { protectedRoute } = require("../middlewares/auth.middleware");

router.post("/register", AuthController.signUp);
router.post("/login", AuthController.signIn);
router.post("/logout", AuthController.logout);
router.get("/me", protectedRoute, AuthController.checkAuth);

module.exports = router;
