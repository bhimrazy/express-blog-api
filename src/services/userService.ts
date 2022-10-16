import User from "../models/user";

export const getAllUsers = async () => {
  return await User.find();
};

export const createUser = async (user: any) => {
  return await User.create(user);
};
export const getUserById = async (id: any) => {
  return await User.findById(id);
};

export const updateUser = async (id: any, user: any) => {
  return await User.findByIdAndUpdate(id, user);
};

export const deleteUser = async (id: any) => {
  return await User.findByIdAndDelete(id);
};
