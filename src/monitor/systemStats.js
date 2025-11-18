import pidusage from "pidusage";

export async function getSystemStats() {
  try {
    const stats = await pidusage(process.pid);

    return {
      cpu: parseFloat(stats.cpu.toFixed(2)),     // %
      ram: parseFloat((stats.memory / 1024 / 1024).toFixed(2)), // MB
      uptime: process.uptime().toFixed(2),       // seconds
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error("Error collecting system stats:", error);
    return null;
  }
}
