import { type LanguageCode } from "@/types/language";

export const text: {
  table: {
    banner: Record<LanguageCode, string>;
    rowSummary: {
      eng: Record<LanguageCode, string>;
      esp: Record<LanguageCode, string>;
    };
  };
} = {
  table: {
    banner: {
      ENG: "TERMINOLOGY",
      ESP: "TERMINOLOGÍA",
    },
    rowSummary: {
      eng: {
        ENG: "English",
        ESP: "Inglés",
      },
      esp: {
        ENG: "Spanish",
        ESP: "Español",
      },
    },
  },
};
