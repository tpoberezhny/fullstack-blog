import { body } from "express-validator";

export const loginValidation = [
  body("email", "Incorrect e-mail").isEmail(),
  body("password", "Password must be min 5 symbols").isLength({ min: 5 }),
];

export const registerValidation = [
  body("email", "Incorrect e-mail").isEmail(),
  body("password", "Password must be min 5 symbols").isLength({ min: 5 }),
  body("fullName", "Write correct format of the name").isLength({ min: 3 }),
  body("avatarUrl", "Incorrect avatar link").optional().isURL(),
];

export const postCreateValidation = [
  body("title", "Write title of the post").isLength({ min: 3 }).isString(),
  body("text", "Write text of the post").isLength({ min: 5 }).isString(),
  body("tags", "Incorrect format of the tags (write an string)")
    .optional()
    .isString(),
  body("imageUrl", "Not valid link on the image").optional().isString(),
];
