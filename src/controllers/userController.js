import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import User from '../models/user.js';
import userService from "../services/userService.js";

export const registerUser = async (req, res) => {
    try {
        const user = req.body;
        if (!user.email || !user.password) {
            return res.status(400).send("Username and password are required.");
        }
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
        const reg_user = await userService.createUser(req.body);
        res.json({ data: reg_user, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const loginUser = async (req, res) => {
    try {
        const user = req.body;
        //check if user exists
        const foundUser = await User.findOne({ email: user.email });
        if (!foundUser) {
            return res.status(400).send("Invalid email or password");
        }
        //check if password is correct
        const isPasswordValid = await bcrypt.compare(
            user.password,
            foundUser.password
        );
        if (!isPasswordValid) {
            return res.status(400).send("Invalid email or password");
        }
        //create token
        const token = jwt.sign({ user }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json({ data: users, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.json({ data: user, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.json({ data: user, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        res.json({ data: user, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await userService.deleteUser(req.params.id);
        res.json({ data: user, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};