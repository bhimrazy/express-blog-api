import { model, Schema } from "mongoose";

const User = model(
  "User",
  new Schema({
    name: { type: String, required: [true, "User Full Name is required"] },
    email: {
      type: String,
      required: [true, "User Email is required."],
      unique: [true, "User Email must be unique."],
    },
    password: {
      type: String,
      required: [true, "User Password is required."],
    },
    // roles: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: "Role"
    //     }
    // ]
  })
);

export default User;
