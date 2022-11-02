import mongoose from "mongoose";
export const connectDB = async () => {
  await mongoose
    .connect(process.env.DATABASE_URL!)
    .then(() => {
      console.log("Successfully connected to the database");
    })
    .catch((err) => {
      console.log("Error connecting to the database");
      console.log(err);
      process.exit();
    });
};
