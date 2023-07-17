import { check } from "express-validator";

export const postRehabilitationResult = [
  check("userUuid").exists(),
  check("rehabilitationCondition").exists(),
  check("rehabilitationStartedAt").exists(),
  check("rehabilitationFinishedAt").exists(),
  check("reachingTimes").exists(),
  check("sharpenedKnifeBefore").exists(),
  check("sharpenedKnifeAfter").exists(),
];
