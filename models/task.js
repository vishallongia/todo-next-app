import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: [100, "Title should less than 100 characters"],
  },
  tag: {
    type: String,
    required: true,
    maxLength: [20, "Tag should less than 20 characters"],
    minLength: [3, "Tag should have at least 3 characters"],
  },
  description: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    // ref: "User",
  },
  taskStartTime: {
    type: String,
  },
  taskEndTime: {
    type: String,
  },
  taskDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export const Task = mongoose.models.task ?? mongoose.model("task", schema);
