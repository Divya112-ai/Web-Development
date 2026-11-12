import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
  nom : Number
});

export const todo= mongoose.model("Todo", todoSchema);
