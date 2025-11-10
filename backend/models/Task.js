import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    completed: { type: Boolean, default: false },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    assignedTo: { type: String, default: "Unassigned" },
  });
  

export default mongoose.model("Task", TaskSchema);
