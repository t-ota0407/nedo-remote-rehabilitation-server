export const avatarStates = [
  "PREPARING",
  "REHABILITATING",
  "INTERACTING_WITH_UI",
] as const;

export type AvatarState = typeof avatarStates[number];
