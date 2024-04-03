import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    unique: true,
    required: true,
    select: false,
    minLength: [8, "Password is too short"],
  },
  label: {
    type: Array,
    default: ["All", "Personal", "Shopping", "Buisness"],
  },
});
export const User = mongoose.models.user ?? mongoose.model("user", schema);
