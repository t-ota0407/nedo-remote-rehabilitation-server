import { check } from "express-validator";

export const signupUser = [
  check("userName").exists(),
  check("password").exists(),
];

export const signinUser = [
  check("userName").exists(),
  check("password").exists(),
]
