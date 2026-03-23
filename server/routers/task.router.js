const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/tasks.controller");

const {protectedRoute} = require("../middlewares/auth.middleware");

router.post("/", protectedRoute, createTask);
router.get("/", protectedRoute, getTasks);
router.put("/:id", protectedRoute, updateTask);
router.delete("/:id", protectedRoute, deleteTask);

module.exports = router;
