function doGet() {
  const sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Terminology");
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return ContentService.createTextOutput("[]");

  // Read column A (Abbreviation)
  const abbrRange = sheet.getRange(2, 1, lastRow - 1, 1);
  const abbrValues = abbrRange.getValues().flat(); // [[a],[b],[c]] -> [a,b,c]

  // Read column B,C,D,E (English, Spanish, English Definition, Spanish Definition)
  const richRange = sheet.getRange(2, 2, lastRow - 1, 4);
  const richValues = richRange.getRichTextValues();

  // Read column F (Area)
  const areaRange = sheet.getRange(2, 6, lastRow - 1, 1);
  const areaValues = areaRange.getValues().flat();

  const output = richValues.map((row, i) => {
    const abbr = abbrValues[i];
    const area = areaValues[i];

    const [englishRT, spanishRT, englishDefinitionRT, spanishDefinitionRT] =
      row;

    const parseRich = (rt) => {
      if (!rt) return null;
      const runs = rt.getRuns();
      if (!runs || runs.length === 0)
        return [{ text: rt.getText(), italic: false }];

      return runs.map((run) => ({
        text: run.getText(),
        isItalic: run.getTextStyle().isItalic(),
        link: run.getLinkUrl(),
      }));
    };

    return {
      abbreviation: abbr || null,
      area: area || null,
      english: parseRich(englishRT),
      spanish: parseRich(spanishRT),
      englishDefinition: parseRich(englishDefinitionRT),
      spanishDefinition: parseRich(spanishDefinitionRT),
    };
  });

  return ContentService.createTextOutput(JSON.stringify(output)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
