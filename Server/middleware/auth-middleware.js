import jwt from "jsonwebtoken";
import User from "../models/user-model.js";

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized, Token not Provided" });
  }

  const jwtToken = token.replace("Bearer", "").trim();
  console.log(jwtToken);

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRETE_KEY);

    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });

    if (!userData) {
      return res
        .status(401)
        .json({ message: "Unauthorized from auth, Invalid Token" });
    }

    req.user = userData;
    req.token = token;
    req.userId = userData._id;

    next();
  } catch (error) {
    console.error(error);

    // Handle specific errors
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Unauthorized, Invalid Token" });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized, Token Expired" });
    }

    // Handle other errors
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default authMiddleware;
