import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async (database_uri) => {
  try {
    // Ensure that the database name is properly appended to the URI
    const uri = `${database_uri}/${DB_NAME}`;
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`DB is connected`, uri);
  } catch (error) {
    console.error("MONGODB connection Failed", error);
    process.exit(1);
  }
};

export default connectDB;
