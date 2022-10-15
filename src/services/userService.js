import User from "../models/user.js"
var userService = {}

userService.getAllUsers = async () => {
    return await User.find();
};

userService.createUser = async (user) => {
    return await User.create(user);
};
userService.getUserById = async (id) => {
    return await User.findById(id);
};

userService.updateUser = async (id, user) => {
    return await User.findByIdAndUpdate(id, user);
};

userService.deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
};

export default userService