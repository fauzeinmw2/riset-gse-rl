import express from "express";
import cors from "cors";
import { trackLatency } from "./monitor/performanceStats.js";
import usersRouter from "./routes/users.js";
import monitorRoutes from "./routes/monitor.js";
import controlRoutes from "./routes/control.js";

import enforceRAM from "./middleware/enforceRAM.js";
import enforceCPU from "./middleware/enforceCPU.js";




const app = express();
app.use(cors());
app.use(express.json());
app.use(trackLatency);

app.use(enforceRAM);
app.use(enforceCPU);

app.get("/", (req, res) => res.send("API is running"));
app.use("/users", usersRouter);
app.use("/monitor", monitorRoutes);
app.use("/control", controlRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
