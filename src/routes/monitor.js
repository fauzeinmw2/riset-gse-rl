import express from "express";
import { getSystemStats } from "../monitor/systemStats.js";
import { getPerformanceStats } from "../monitor/performanceStats.js";

const router = express.Router();

router.get("/system", async (req, res) => {
  const stats = await getSystemStats();
  return res.json(stats);
});

router.get("/performance", (req, res) => {
  const stats = getPerformanceStats();
  return res.json(stats);
});

router.get("/summary", async (req, res) => {
  const system = await getSystemStats();
  const performance = getPerformanceStats();

  return res.json({
    ...system,
    ...performance
  });
});

export default router;
