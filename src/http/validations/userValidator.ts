import { check } from "express-validator";

export const signupUser = [
  check("userName").exists(),
  check("password").exists(),
  check("currentAvatarType").exists(),
];

export const signinUser = [
  check("userName").exists(),
  check("password").exists(),
  check("currentAvatarType").exists(),
];

export const signupWithTemporaryAccountUser = [
  check("userName").exists(),
  check("currentAvatarType").exists(),
];
