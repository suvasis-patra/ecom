import mongoose from "mongoose";
import config from "./env.js";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.DATABASE_URL);
    console.log(`database connected to host :${conn.connection.host}`);
  } catch (error) {
    console.log("failed to connect the database", error);
    process.exit(1);
  }
};

export default connectDB;
