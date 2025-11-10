import express from "express";
import Team from "../models/Team.js";

const router = express.Router();

/**
 * @route   GET /api/team
 * @desc    Get all team members
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    const members = await Team.find();
    res.json(members);
  } catch (error) {
    console.error("Error fetching team members:", error.message);
    res.status(500).json({ message: "Server error while fetching team members" });
  }
});

/**
 * @route   POST /api/team
 * @desc    Add a new team member
 * @access  Public
 */
router.post("/", async (req, res) => {
  try {
    const { name, role } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Name is required" });
    }

    const newMember = new Team({
      name: name.trim(),
      role: role?.trim() || "Team Member",
      tasks: 0,
      capacity: 0,
    });

    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    console.error("Error adding team member:", error.message);
    res.status(500).json({ message: "Server error while adding member" });
  }
});

/**
 * @route   DELETE /api/team/:id
 * @desc    Delete a team member by ID
 * @access  Public
 */
router.delete("/:id", async (req, res) => {
  try {
    const member = await Team.findByIdAndDelete(req.params.id);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.json({ message: `Team member '${member.name}' deleted successfully` });
  } catch (error) {
    console.error("Error deleting team member:", error.message);
    res.status(500).json({ message: "Server error while deleting member" });
  }
});

/**
 * @route   POST /api/team/seed
 * @desc    (Optional) Manually seed default team members
 * @access  Public
 * @usage   Call only when you want to restore defaults
 */
router.post("/seed", async (req, res) => {
  try {
    await Team.deleteMany(); // clear old ones if needed
    const seeded = await Team.insertMany([
      { name: "Sarah Chen", role: "Lead Architect", tasks: 0, capacity: 0 },
      { name: "Marcus Rodriguez", role: "Senior Designer", tasks: 0, capacity: 0 },
      { name: "Elena Volkov", role: "Junior Architect", tasks: 0, capacity: 0 },
    ]);
    res.json(seeded);
  } catch (error) {
    console.error("Error seeding default team members:", error.message);
    res.status(500).json({ message: "Server error while seeding defaults" });
  }
});

export default router;
