import User from "../models/user";

export const userService = {
  getAllUsers: async () => {
    return await User.find();
  },

  createUser: async (user: any) => {
    return await User.create(user);
  },
  getUserById: async (id: any) => {
    return await User.findById(id);
  },

  updateUser: async (id: any, user: any) => {
    return await User.findByIdAndUpdate(id, user);
  },

  deleteUser: async (id: any) => {
    return await User.findByIdAndDelete(id);
  },
};
