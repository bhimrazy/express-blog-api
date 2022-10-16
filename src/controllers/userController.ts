import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";
import * as userService from "../services/userService";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { userSerializer } from "../serializers/serializers";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    // if there is error then return Error
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    const user = req.body;
    if (!user.email || !user.password) {
      return res
        .status(400)
        .send({ message: "Username and password are required." });
    }
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    const reg_user = await userService.createUser(req.body);
    res.json({ data: userSerializer(reg_user), status: "success" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
export const loginUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    //check if user exists
    const foundUser = await User.findOne({
      email: user.email,
    });
    if (!foundUser) {
      return res.status(400).send({ message: "Invalid email or password" });
    }
    //check if password is correct
    const isPasswordValid = await bcrypt.compare(
      user.password,
      foundUser.password
    );
    if (!isPasswordValid) {
      return res.status(400).send({ message: "Invalid email or password" });
    }
    //create token
    const token = jwt.sign({ user }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    res.json({ token, user: userSerializer(foundUser) });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.json({ data: users, status: "success" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);
    res.json({ data: user, status: "success" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json({ data: user, status: "success" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json({ data: user, status: "success" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    res.json({ data: user, status: "success" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
