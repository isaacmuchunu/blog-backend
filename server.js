import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { errorHandler, invalidPathHandler } from "./middleware/errorHandler.js";

import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("running");
});

app.use("/api/users", userRoutes);
app.use(invalidPathHandler);

app.use(errorHandler);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
