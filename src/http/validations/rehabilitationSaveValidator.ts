import { check, query } from "express-validator";

export const getRehabilitationSave = [
  query("userUuid").exists(),
];

export const postRehabilitationSave = [
  check("userUuid").exists(),
  check("saveData").exists(),
];
