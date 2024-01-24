import express from "express";
const router = express.Router();
import adminController from "../controllers/admin-controller.js";
import authMiddleware from "../middleware/auth-middleware.js";
import adminMiddleware from "../middleware/admin-middleware.js";

router
  .route("/users")
  .get(adminMiddleware, authMiddleware, adminController.getAllUsers);
router
  .route("/users/:id")
  .get(adminMiddleware, authMiddleware, adminController.getUserById);
router
  .route("/users/update/:id")
  .patch(adminMiddleware, authMiddleware, adminController.updateUserById);
router
  .route("/users/delete/:id")
  .delete(adminMiddleware, authMiddleware, adminController.deleteUserById);
router
  .route("/contacts")
  .get(adminMiddleware, authMiddleware, adminController.getContact);

export default router;
