import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

import { validationResult } from 'express-validator';
import { registerValidation } from "./validations/auth.js";

const adminPassword = process.env.MONGO_ADMIN_PASSWORD;

mongoose
  .connect(
    `mongodb+srv://admin:${adminPassword}@cluster0.m4jtwh0.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

const app = express();

app.use(express.json());

app.post("/auth/register", registerValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array())
  }

  res.json({
    success: true
  })
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
