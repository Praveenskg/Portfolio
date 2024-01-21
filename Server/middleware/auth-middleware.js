import jwt from "jsonwebtoken";
import User from "../models/user-model.js";
const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ message: " Unauthorized HTTP , Token not Provided" });
  }
  const jwtToken = token.replace("Bearer", "").trim();
  console.log("Token from auth middleware ", jwtToken);
  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRETE_KEY);

    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });
    console.log(userData);
    req.user = userData;
    req.token = token;
    req.userId = userData._id;
    next();
  } catch (error) {}
};
export default authMiddleware;
