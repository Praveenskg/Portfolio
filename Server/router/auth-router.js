import express from "express";
const router = express.Router();
import auth from "../controllers/auth-controller.js";
import validate from "../middleware/validate-middleware.js";
import Schema from "../validators/auth-validator.js";
import authController from "../controllers/auth-controller.js";
import authMiddleware from "../middleware/auth-middleware.js";

router.route("/").get(auth.Home);
router.route("/register").post(validate(Schema.signupSchema), auth.Register);
router.route("/login").post(validate(Schema.loginSchema), auth.Login);

router.route("/user").get(authMiddleware, authController.user);
export default router;
