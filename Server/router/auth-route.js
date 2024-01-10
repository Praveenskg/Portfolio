import express from "express";
const router = express.Router();
import auth from "../controllers/auth-controller.js";
import validate from "../middleware/validate-maddleware.js";
import Schema from "../validators/auth-validator.js";

router.route("/").get(auth.Home);
router.route("/register").post(validate(Schema.signupSchema), auth.Register);
router.route("/login").post(validate(Schema.loginSchema), auth.Login);

export default router;
