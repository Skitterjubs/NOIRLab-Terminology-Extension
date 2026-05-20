export type RichTextEntry = {
  text: string;
  isItalic: boolean;
  link: string | null;
};

export type Terminology = {
  abbreviation: string | null;
  area: string | null;
  english: RichTextEntry[];
  spanish: RichTextEntry[];
  englishDefinition: RichTextEntry[];
  spanishDefinition: RichTextEntry[];
};
