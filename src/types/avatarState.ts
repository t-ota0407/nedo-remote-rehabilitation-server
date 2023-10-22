export const avatarStates = [
  "WALKING",
  "KNIFE_SHARPENING",
  "INTERACTING_WITH_UI",
] as const;

export type AvatarState = typeof avatarStates[number];
