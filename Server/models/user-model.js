import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    isAdmin: {
      type: Boolean,
      default: false,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Secure Password Using Bcrypt Pre Method
userSchema.pre("save", async function (next) {
  try {
    const user = this;
    // Check if the password field is modified or new
    if (!user.isModified("password")) {
      return next();
    }

    // Normalize email to lowercase
    if (user.isModified("email")) {
      user.email = user.email.toLowerCase();
    }

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    // Replace plain password with hashed password
    user.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

// Json Web Token Generate
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        name: this.username,
        email: this.email,
        isAdmin: this.isAdmin,
        userId: this._id.toString(),
      },
      process.env.JWT_SECRETE_KEY,
      {
        expiresIn: "7d",
      }
    );
  } catch (error) {
    console.error(error);
  }
};
const User = new mongoose.model("User", userSchema);

export default User;
