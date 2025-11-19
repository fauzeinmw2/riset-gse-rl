import express from "express";
import cors from "cors";
import { trackLatency } from "./monitor/performanceStats.js";
import usersRouter from "./routes/users.js";
import monitorRoutes from "./routes/monitor.js";
import controlRoutes from "./routes/control.js";
import orderRoutes from "./routes/orders.js";

import enforceRAM from "../middleware/enforceRAM.js";
import enforceCPU from "../middleware/enforceCPU.js";




const app = express();
app.use(cors());
app.use(express.json());
app.use(trackLatency);

app.get("/", (req, res) => res.send("API is running"));
app.use("/users", usersRouter, enforceCPU, enforceRAM);
app.use("/monitor", monitorRoutes);
app.use("/control", controlRoutes);
app.use("/orders", orderRoutes, enforceCPU, enforceRAM);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
