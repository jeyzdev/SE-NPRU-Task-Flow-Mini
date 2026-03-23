const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["todo", "in_progress", "done"],
      default: "todo",
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    dueDate: {
      type: Date,
    },

    isCompleted: {
      type: Boolean,
      default: false,
    },

    tags: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true },
);

const Task = model("Task", TaskSchema);

module.exports = Task;