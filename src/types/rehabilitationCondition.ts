export const rehabilitationConditions = [
  'HOMO_WITH_TIES',
  'HOMO_WITHOUT_TIES',
  'HETERO_WITH_TIES',
  'HETERO_WITHOUT_TIES'
] as const;

export type RehabilitationCondition = typeof rehabilitationConditions[number];
