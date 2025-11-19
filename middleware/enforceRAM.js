import os from "os";
import process from "process";
import { getResourceLimit } from "./config/resourceManager.js";

function enforceRAM(req, res, next) {
  const { ramLimitMB } = getResourceLimit();

  const usedMB = process.memoryUsage().rss / 1024 / 1024;

  if (usedMB > ramLimitMB) {
    console.warn(`RAM limit exceeded: ${usedMB.toFixed(2)}MB > ${ramLimitMB}MB`);
    return res.status(503).json({
      error: "RAM limit exceeded",
      usedMB,
      ramLimitMB,
    });
  }

  next();
}

export default enforceRAM;
