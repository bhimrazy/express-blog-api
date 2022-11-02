import express from "express";
import { AuthController } from "../controllers/authController";
const userRouter = express.Router();
import { getAllUsers } from "../controllers/userController";
import { verifyUserToken } from "../middlewares/verifyUserToken";
import {
  createUserDataValidator,
  loginUserDataValidator,
} from "../validators/user.validator";

userRouter.post(
  "/register",
  createUserDataValidator,
  AuthController.registerUser
);
userRouter.post("/login", loginUserDataValidator, AuthController.loginUser);
userRouter.get("/profile", verifyUserToken, AuthController.getUser);
userRouter.get("/users", verifyUserToken, getAllUsers);
export default userRouter;
