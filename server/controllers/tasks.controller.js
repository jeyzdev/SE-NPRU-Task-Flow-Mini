const Task = require("../models/task.model");

exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, tags } = req.body;

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      tags,
      user: req.user.id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({
      _id: id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const allowedFields = [
      "title",
      "description",
      "status",
      "priority",
      "dueDate",
      "tags",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        task[field] = req.body[field];
      }
    });

    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
