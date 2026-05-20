export const LANGUAGE = {
  ENG: "ENG",
  ESP: "ESP",
} as const;

export type LanguageCode = (typeof LANGUAGE)[keyof typeof LANGUAGE];
