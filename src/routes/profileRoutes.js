import { Router } from "express";
import { getProfile } from "../controllers/profileController.js";
import { authRequired } from "../middleware/authRequired.js";

export const profileRoutes = Router();

profileRoutes.get("/profile", authRequired, getProfile);

