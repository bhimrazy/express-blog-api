import { userService } from "../services/userService";
import { Request, Response } from "express";
import { Serializer } from "../serializers/serializers";

export const UserController = {
  getAllUsers: async (req: Request, res: Response) => {
    try {
      const users = await userService.getAllUsers();
      res.json({ status: "success", data: Serializer.usersSerializer(users) });
    } catch (err: any) {
      res.status(500).json({ status: "error", message: err.message });
    }
  },

  createUser: async (req: Request, res: Response) => {
    try {
      const user = await userService.createUser(req.body);
      res.json({ status: "success", data: user });
    } catch (err: any) {
      res.status(500).json({ status: "error", message: err.message });
    }
  },

  getUserById: async (req: Request, res: Response) => {
    try {
      const user = await userService.getUserById(req.params.id);
      res.json({ status: "success", data: user });
    } catch (err: any) {
      res.status(500).json({ status: "error", message: err.message });
    }
  },

  updateUser: async (req: Request, res: Response) => {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      res.json({ status: "success", data: user });
    } catch (err: any) {
      res.status(500).json({ status: "error", message: err.message });
    }
  },

  deleteUser: async (req: Request, res: Response) => {
    try {
      const user = await userService.deleteUser(req.params.id);
      res.json({ status: "success", data: user });
    } catch (err: any) {
      res.status(500).json({ status: "error", message: err.message });
    }
  },
};
