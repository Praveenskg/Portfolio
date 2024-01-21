import express from "express";
const router = express.Router();
import adminController from "../controllers/admin-controller.js";
router.route("/users").get(adminController.getAllUsers);
router.route("/contacts").get(adminController.getContact);

export default router;
