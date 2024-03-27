import express from "express";
const router = express.Router();
import adminController from "../controllers/admin-controller.js";
import authMiddleware from "../middleware/auth-middleware.js";
import adminMiddleware from "../middleware/admin-middleware.js";

router
  .route("/user")
  .get(adminMiddleware, authMiddleware, adminController.getUser);
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
router
  .route("/contacts/:id")
  .get(adminMiddleware, authMiddleware, adminController.getContactUser);
router
  .route("/contacts/delete/:id")
  .delete(adminMiddleware, authMiddleware, adminController.deleteContactUser);

export default router;
