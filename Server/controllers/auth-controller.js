import User from "../models/user-model.js";
import bcrypt from "bcryptjs";

const Home = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Hi! This is the Home route.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const Register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({ message: "Email Already Exist" });
    }

    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${username}`,
    });
    res.status(201).json({
      success: true,
      message: "Registration Successful",
      data: {
        token: await userCreated.generateToken(),
        userId: userCreated._id.toString(),
      },
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, userExist.password);
    if (isPasswordValid) {
      res.status(200).json({
        success: true,
        message: "Login Successful",
        data: {
          token: await userExist.generateToken(),
          userId: userExist._id.toString(),
          isAdmin: userExist.isAdmin,
        },
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Password Incorrect",
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

const user = async (req, res) => {
  try {
    const userData = req.user;
    res.status(200).json({ userData });
  } catch (error) {
    console.log(`Error From user router ${error}`);
  }
};

export default { Home, Register, Login, user };
