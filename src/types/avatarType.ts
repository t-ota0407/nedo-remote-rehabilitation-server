export const avatarTypes = [
  'AVATAR_FEMALE_1',
  'AVATAR_FEMALE_2',
  'AVATAR_MALE_1',
  'AVATAR_MALE_2'
] as const;

export type avatarType = typeof avatarTypes[number];
