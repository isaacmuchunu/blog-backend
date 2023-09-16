import express from "express";
const router = express.Router();
import { registerUser } from "../controllers/userControllers";
//create a controller for the path below in the controllers folder
router.post("/register", registerUser);
export default router;
