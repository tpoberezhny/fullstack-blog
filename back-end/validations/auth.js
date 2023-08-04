import { body } from "express-validator";

export const registerValidation = [
  body("email", "Incorrect e-mail").isEmail(),
  body("password", "Password must be min 5 symbols").isLength({ min: 5 }),
  body("fullName", "Write correct format of the name").isLength({ min: 3 }),
  body("avatarUrl", "Incorrect avatar link").optional().isURL(),
];
