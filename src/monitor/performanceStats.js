import responseTime from "response-time";

let lastLatency = 0;

export const trackLatency = responseTime((req, res, time) => {
  lastLatency = time; // ms
});

export function getPerformanceStats() {
  return {
    latency: parseFloat(lastLatency.toFixed(2)),
    timestamp: new Date().toISOString()
  };
}
