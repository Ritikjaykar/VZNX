import express from "express";
import mongoose from "mongoose";
import Task from "../models/Task.js";
import Project from "../models/Project.js";

const router = express.Router();

/**
 * @route   GET /api/tasks/:projectId
 * @desc    Get all tasks for a specific project
 * @access  Public
 */
router.get("/:projectId", async (req, res) => {
  try {
    const tasks = await Task.find({ projectId: req.params.projectId });
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    res.status(500).json({ message: "Server error while fetching tasks" });
  }
});

/**
 * @route   POST /api/tasks
 * @desc    Add a new task to a project
 * @access  Public
 */
router.post("/", async (req, res) => {
  try {
    const { name, projectId, assignedTo } = req.body;

    if (!name || !projectId) {
      return res.status(400).json({ message: "Task name and projectId are required" });
    }

    const task = await Task.create({
      name: name.trim(),
      projectId,
      assignedTo: assignedTo || "Unassigned",
    });

    await updateProjectProgress(projectId);
    res.status(201).json(task);
  } catch (error) {
    console.error("Error adding task:", error.message);
    res.status(500).json({ message: "Server error while adding task" });
  }
});

/**
 * @route   PUT /api/tasks/toggle/:id
 * @desc    Toggle task completion status
 * @access  Public
 */
router.put("/toggle/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.completed = !task.completed;
    await task.save();

    await updateProjectProgress(task.projectId);

    res.json(task);
  } catch (error) {
    console.error("Error toggling task:", error.message);
    res.status(500).json({ message: "Server error while toggling task" });
  }
});

/**
 * @route   DELETE /api/tasks/:id
 * @desc    Delete a task by ID
 * @access  Public
 */
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    await updateProjectProgress(task.projectId);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error.message);
    res.status(500).json({ message: "Server error while deleting task" });
  }
});

/**
 * @function updateProjectProgress
 * @desc Helper to recalculate project progress and update status
 */
async function updateProjectProgress(projectId) {
  try {
    // 🧩 make sure projectId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(projectId)) return;

    const tasks = await Task.find({ projectId });
    const completed = tasks.filter((t) => t.completed).length;
    const total = tasks.length;
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

    const project = await Project.findById(projectId);
    if (project) {
      project.progress = progress;
      project.taskCount = total;
      project.completedTaskCount = completed;
      project.status =
        progress === 100 ? "Completed" : progress > 0 ? "In Progress" : "Planning";
      await project.save();
    }
  } catch (error) {
    console.error("Error updating project progress:", error.message);
  }
}

export default router;
