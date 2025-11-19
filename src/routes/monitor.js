import express from "express";
import { getSystemStats } from "../monitor/systemStats.js";
import { getPerformanceStats } from "../monitor/performanceStats.js";
import { getResourceLimit } from "../../config/resourceManager.js";
import pidusage from "pidusage";

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
  const limits = getResourceLimit();
  const stats = await pidusage(process.pid);

  return res.json({
    cpu: stats.cpu.toFixed(2),
    ram: (process.memoryUsage().rss / 1024 / 1024).toFixed(2),
    limit: limits
  });
});

export default router;
