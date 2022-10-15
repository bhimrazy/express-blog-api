import express from "express";
const userRouter = express.Router();
import {
  getAllUsers,
  registerUser,
  loginUser,
} from "../controllers/userController.js"
import { verifyUserToken } from "../middlewares/verifyUserToken.js";

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/users", verifyUserToken, getAllUsers);
export default userRouter;