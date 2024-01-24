import jwt from "jsonwebtoken";
import User from "../models/user-model.js";

const adminMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized, Token not Provided" });
  }

  const jwtToken = token.replace("Bearer ", "").trim();

  console.log("Received Token", token);

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRETE_KEY);

    const userData = await User.findOne({ email: isVerified.email });
    console.log("Received Token", token);

    if (!userData) {
      return res.status(401).json({ message: "Unauthorized, Invalid Token" });
    }

    if (!userData.isAdmin) {
      return res.status(403).json({ message: "Forbidden, Not an Admin" });
    }

    req.user = userData;
    req.token = token;
    req.userId = userData._id;

    next();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error From Admin Middleware" });
  }
};

export default adminMiddleware;
