import express from "express";
import { protectRoute } from "../Middleware/authMiddleware.js";
import { getStreamToken } from "../Controllers/chatController.js";

const router = express.Router();

router.get("/token", protectRoute, getStreamToken);

export default router;