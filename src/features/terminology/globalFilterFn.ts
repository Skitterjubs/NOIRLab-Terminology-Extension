import { type Row } from "@tanstack/react-table";
import { type Terminology } from "@/types/terminology";

function matches(text: string | null, search: string | null) {
  if (!text || !search) return false;

  text = text.toLocaleLowerCase();
  search = search.toLocaleLowerCase();
  const searchWords = search.split(" ");
  return searchWords.every((word) => text.includes(word));
}

export function globalFilterFn(
  row: Row<Terminology>,
  _: string,
  filterValue: string,
  addMeta: ({ relevance }: { relevance: number }) => void
): boolean {
  if (!filterValue) {
    return true;
  }

  const {
    abbreviation,
    english,
    spanish,
    englishDefinition,
    spanishDefinition,
  } = row.original;

  const matchesAbbreviation = matches(abbreviation, filterValue);
  const matchesEnglish = english.some(({ text }) => matches(text, filterValue));
  const matchesSpanish = spanish.some(({ text }) => matches(text, filterValue));
  const matchesEnglishDefinition = englishDefinition.some(({ text }) =>
    matches(text, filterValue)
  );
  const matchesSpanishDefinition = spanishDefinition.some(({ text }) =>
    matches(text, filterValue)
  );

  if (matchesAbbreviation) addMeta({ relevance: 2 });

  return (
    matchesAbbreviation ||
    matchesEnglish ||
    matchesSpanish ||
    matchesEnglishDefinition ||
    matchesSpanishDefinition
  );
}
