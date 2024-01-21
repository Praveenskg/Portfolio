import mongoose from "mongoose";
const URI = process.env.MONGODB_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connection Successful to Db");
  } catch (error) {
    console.error("Database Connection Failed");
    process.exit(0);
  }
};
export default connectDb;
