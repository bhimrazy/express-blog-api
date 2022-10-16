import { ConnectOptions } from "mongodb";
import mongoose from "mongoose";
export const connectDB = async () => {
  await mongoose
    .connect(process.env.DATABASE_URL!)
    .then(() => {
      console.log("Successfully connected to the database");
    })
    .catch((err) => {
      console.log("error connecting to the database");
      console.log(err);
      process.exit();
    });
};
