import { type LanguageCode } from "@/types/language";

export const text: {
  searchBar: {
    placeholder: Record<LanguageCode, string>;
  };
  datatable: {
    pagination: Record<LanguageCode, string>;
    noResults: Record<LanguageCode, string>;
  };
} = {
  searchBar: {
    placeholder: {
      ENG: "Search...",
      ESP: "Buscar...",
    },
  },
  datatable: {
    pagination: {
      ENG: "Showing ${showingStart} to ${showingEnd} of ${totalRows} results.",
      ESP: "Mostrando ${showingStart} a ${showingEnd} de ${totalRows} resultados.",
    },
    noResults: {
      ENG: "No results.",
      ESP: "No hay resultados.",
    },
  },
};
