import pidusage from "pidusage";
import { getResourceLimit } from "./config/resourceManager.js";

async function enforceCPU(req, res, next) {
  const { cpuLimit } = getResourceLimit();

  const stats = await pidusage(process.pid);

  const cpu = stats.cpu; // CPU usage in %

  if (cpu > cpuLimit) {
    console.warn(`CPU limit exceeded: ${cpu}% > ${cpuLimit}%`);
    await new Promise(resolve => setTimeout(resolve, 200)); // throttle 200 ms
  }

  next();
}

export default enforceCPU;
