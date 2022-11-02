import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  name: { type: String, required: [true, "User Full Name is required"] },
  email: {
    type: String,
    required: [true, "User Email is required."],
    unique: [true, "User Email must be unique."],
    trim: [true],
    lowecase: [true],
  },
  password: {
    type: String,
    required: [true, "User Password is required."],
    min: 8,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    required: true,
    default: "user",
  },
});

userSchema.pre("save", function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

const User = model("User", userSchema);

userSchema.static("findUserByEmail", function (email) {
  return new Promise((resolve, reject) => {
    User.findOne({ email: email }).exec(function (err, user) {
      if (err) reject(err);
      resolve(user);
    });
  });
});
export default User;
