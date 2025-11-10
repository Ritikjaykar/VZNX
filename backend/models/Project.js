import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: String, default: "Planning" },
    progress: { type: Number, default: 0 },
    taskCount: { type: Number, default: 0 },
    completedTaskCount: { type: Number, default: 0 },
  });
  

export default mongoose.model("Project", ProjectSchema);
