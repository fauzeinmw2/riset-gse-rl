// src/routes/control.js
import express from "express";
const router = express.Router();

// simple in-memory globals (persist ke DB nanti jika perlu)
let devops_focus = "performance"; // "performance" | "energy"
let current_mode = "normal"; // "performance", "energy", "normal"

// get current focus (CP or RL can read)
router.get("/focus", (req, res) => {
  res.json({ focus: devops_focus });
});

// set focus (from CP)
router.post("/focus", (req, res) => {
  const { focus } = req.body;
  if (focus !== "performance" && focus !== "energy") {
    return res.status(400).json({ error: "focus must be 'performance' or 'energy'" });
  }
  devops_focus = focus;
  res.json({ ok: true, focus: devops_focus });
});

// get current mode
router.get("/mode", (req, res) => {
  res.json({ mode: current_mode });
});

// set action/mode (called by RL agent)
router.post("/action", (req, res) => {
  const { action } = req.body;
  // action: 'increase_performance' | 'reduce_performance' | 'maintain'
  if (!["increase_performance", "reduce_performance", "maintain"].includes(action)) {
    return res.status(400).json({ error: "invalid action" });
  }

  // Apply action — implement effect here.
  // For simplicity: we toggle a variable `current_mode`. Your app can read current_mode to change behavior.
  if (action === "increase_performance") current_mode = "performance";
  else if (action === "reduce_performance") current_mode = "energy";
  else current_mode = "normal";

  // Optionally adjust app config: e.g., change concurrency setting in-memory, or call internal functions.
  // For demo we just save the mode. Extend this to change worker pools or resource limits.

  res.json({ ok: true, mode: current_mode });
});

export default router;
