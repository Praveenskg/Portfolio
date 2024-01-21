import express from "express";
const router = express.Router();
import adminController from "../controllers/admin-controller.js";
import authMiddleware from "../middleware/auth-middleware.js";

router.route("/users").get(authMiddleware, adminController.getAllUsers);
router.route("/contacts").get(authMiddleware, adminController.getContact);

export default router;
