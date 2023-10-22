export const rehabilitationConditions = [
  'SIMPLE',
  'GAMIFICATION',
  'COMMUNICATION'
] as const;

export type RehabilitationCondition = typeof rehabilitationConditions[number];
