import { body } from "express-validator";
import User from "../models/user";

export const createUserDataValidator = [
  body("name").exists().withMessage("Name is required"),
  body("email")
    .exists()
    // To delete leading and triling space
    .trim()

    // Normalizing the email address
    .normalizeEmail()
    .isEmail()
    .withMessage("Provide valid email")
    // Custom validation
    // Validate email in use or not
    .custom(async (email) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("Email already in use");
      }
    }),
  body("password")
    .exists()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password should be string")
    .isLength({ min: 5 })
    .withMessage("Password should be at least 5 characters"),
];

export const loginUserDataValidator = [
  body("name").exists().withMessage("Name is required"),
  body("email").optional().isEmail().withMessage("Provide valid email"),
  body("password")
    .exists()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password should be string"),
];

export const updateBlogDataValidator = [
  body("email").isString().withMessage("Title should be string"),
  body("description").isString().withMessage("Description should be string"),
];
