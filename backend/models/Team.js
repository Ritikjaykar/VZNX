import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
  name: String,
  role: String,
  tasks: { type: Number, default: 0 },
  capacity: { type: Number, default: 0 }
});

export default mongoose.model("Team", TeamSchema);
