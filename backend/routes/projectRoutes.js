import express from "express";
import Project from "../models/Project.js";
const router = express.Router();

router.get("/", async (req, res) => res.json(await Project.find()));
router.post("/", async (req, res) => res.json(await Project.create(req.body)));
router.put("/:id", async (req, res) => res.json(await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete("/:id", async (req, res) => res.json(await Project.findByIdAndDelete(req.params.id)));

export default router;
