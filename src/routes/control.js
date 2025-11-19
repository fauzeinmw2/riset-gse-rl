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

  // Action yang diizinkan (NEW)
  const allowed = ["scale_up_limit", "scale_down_limit", "normal"];

  if (!allowed.includes(action)) {
    return res.status(400).json({ error: "invalid action" });
  }

  applyAction(action);

  // Ubah current_mode sesuai action
  if (action === "scale_up_limit") current_mode = "performance";
  else if (action === "scale_down_limit") current_mode = "energy";
  else current_mode = "normal"; // fallback

  // Bisa ditambahkan efek lain (misalnya ubah limit concurrency fungsi tertentu)

  res.json({ ok: true, applied: current_mode });
});


export default router;
