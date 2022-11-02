import express from "express";
import { AuthController } from "../controllers/authController";
import { UserController } from "../controllers/userController";
import { verifyUserToken } from "../middlewares/verifyUserToken";
import {
  createUserDataValidator,
  loginUserDataValidator,
} from "../validators/user.validator";

const userRouter = express.Router();

userRouter.post(
  "/register",
  createUserDataValidator,
  AuthController.registerUser
);
userRouter.post("/login", loginUserDataValidator, AuthController.loginUser);
userRouter.get("/profile", verifyUserToken, AuthController.getUser);
userRouter.get("/list", verifyUserToken, UserController.getAllUsers);

export default userRouter;
