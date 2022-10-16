import express from "express";
const userRouter = express.Router();
import {
  getAllUsers,
  registerUser,
  loginUser,
} from "../controllers/userController";
import { verifyUserToken } from "../middlewares/verifyUserToken";
import {
  createUserDataValidator,
  loginUserDataValidator,
} from "../validators/user.validator";

userRouter.post("/register", createUserDataValidator, registerUser);
userRouter.post("/login", loginUserDataValidator, loginUser);
userRouter.get("/users", verifyUserToken, getAllUsers);
export default userRouter;
