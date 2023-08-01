import { check } from "express-validator";

export const postRehabilitationResult = [
  check("userUuid").exists(),
  check("result").exists(),
];
