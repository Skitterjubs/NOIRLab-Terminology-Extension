import { useContext, Fragment } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import type { RichTextEntry, Terminology } from "@/types/terminology";
import { Badge } from "@/components/ui/badge";
import { LanguageContext } from "@/contexts/language-context";
import { text } from "@/features/terminology/text";
import { LANGUAGE } from "@/types/language";

export const columns: ColumnDef<Terminology>[] = [
  {
    id: "abbreviation",
    accessorKey: "abbreviation",
    header: () => {
      const { lang } = useContext(LanguageContext);

      return (
        <p className="text-center font-bold py-4 uppercase text-base">
          {text.table.banner[lang]}
        </p>
      );
    },
    cell: ({ row }) => {
      const { lang } = useContext(LanguageContext);
      const {
        abbreviation,
        english,
        spanish,
        englishDefinition,
        spanishDefinition,
        area,
      } = row.original;
      const definition =
        lang === LANGUAGE.ENG ? englishDefinition : spanishDefinition;

      function getFormattedRichTextEntry(entry: RichTextEntry, key: number) {
        const { text, isItalic, link } = entry;

        const formattedText = isItalic ? <i>{text}</i> : text;

        return (
          <Fragment key={key}>
            {link ? (
              <a
                key={key}
                href={link}
                target="_blank"
                className="text-noirlab-primary-blue cursor-pointer hover:underline"
              >
                {formattedText}
              </a>
            ) : (
              formattedText
            )}
          </Fragment>
        );
      }

      return (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="font-bold">{abbreviation}</p>
            {area && <Badge className="bg-noirlab-primary-blue">{area}</Badge>}
          </div>
          <div>
            <p className="text-wrap">
              <strong>{text.table.rowSummary.eng[lang]}:</strong>{" "}
              {english.map((entry, idx) =>
                getFormattedRichTextEntry(entry, idx)
              )}
            </p>
            <p className="text-wrap">
              <strong>{text.table.rowSummary.esp[lang]}:</strong>{" "}
              {spanish.map((entry, idx) =>
                getFormattedRichTextEntry(entry, idx)
              )}
            </p>
          </div>
          <p className="text-wrap">
            {definition.map((entry, idx) =>
              getFormattedRichTextEntry(entry, idx)
            )}
          </p>
        </div>
      );
    },
    sortingFn: (ra, rb) => {
      const a =
        (ra.columnFiltersMeta.abbreviation as { relevance?: number })
          ?.relevance ?? 0;
      const b =
        (rb.columnFiltersMeta.abbreviation as { relevance?: number })
          ?.relevance ?? 0;
      return a - b;
    },

    enableSorting: true,
  },
];
