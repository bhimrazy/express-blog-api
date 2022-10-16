import express from "express";
const userRouter = express.Router();
import {
  getAllUsers,
  registerUser,
  loginUser,
} from "../controllers/userController";
import { verifyUserToken } from "../middlewares/verifyUserToken";

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/users", verifyUserToken, getAllUsers);
export default userRouter;
