import { type LanguageCode } from "@/types/language";

export const text: {
  firstParagraph: Record<LanguageCode, string>;
  secondParagraph: {
    normal: Record<LanguageCode, string>;
    strong: Record<LanguageCode, string>;
  };
} = {
  firstParagraph: {
    ENG: "This extension is under development.",
    ESP: "Esta extensión se encuentra en desarrollo.",
  },
  secondParagraph: {
    normal: {
      ENG: "Have feedback or suggestions?",
      ESP: "¿Tienes comentarios o sugerencias?",
    },
    strong: {
      ENG: "Let us know!",
      ESP: "¡Añádelos aquí!",
    },
  },
};
