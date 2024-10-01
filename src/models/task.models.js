import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      default: Date.now,
    },
    priority: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Task", taskSchema);
