# Open-Source Version of the NOIRLab Terminology Extension

This project is an open-source version of the terminology extension used by NOIRLab.

The extension allows you to load and display terminology entries from a remote API source.

You can host your own terminology database using your own backend, or use a simple setup based on Google Sheets + Google Apps Script.

---

## Features

- Browser extension built with Vite
- Supports English and Spanish terminology
- Rich text rendering support
- Optional abbreviation support
- Google Sheets backend support
- Google Apps Script integration template included
- Easy deployment to the Chrome Web Store

---

## Requirements

Before running or building the project, make sure you have:

- Node.js (recommended: latest LTS version)
- npm (included with Node.js)
- A public API endpoint returning the expected structure
- A Google account _(optional, only if using Google Sheets + Apps Script)_

### Verify Your Installation

```bash
node -v
npm -v
```

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/Skitterjubs/NOIRLab-Terminology-Extension.git
```

### Install Dependencies

```bash
npm install
```

---

## Environment Variables

This repository includes a `.env.example` file with placeholder values.

### Example

```env
VITE_API_URL=My API URL
```

### Create Your Own `.env` File

```bash
cp .env.example .env
```

Then replace the placeholder value with your real API endpoint:

```env
VITE_API_URL=https://your-api-url.com
```

---

## Important Security Note

Even though `.env` variables are injected during build time, frontend environment variables are still visible in the final browser bundle.

Users can inspect them through browser developer tools.

### Because of This

- Your API endpoint should be considered public
- Do not expose private credentials
- Do not store secrets in frontend environment variables

### Recommended API Protection

If needed, secure your API using:

- Rate limiting
- API keys
- Reverse proxies
- Authentication middleware
- Cloudflare or similar protection services

---

## Expected API Response Format

The extension expects the API to return an array of `Terminology` objects with the following structure:

```ts
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
```

### Example Response

```json
[
  {
    "abbreviation": "UFO",
    "area": "Astronomy",
    "english": [
      {
        "text": "Unidentified Floating Oreo",
        "isItalic": false,
        "link": null
      }
    ],
    "spanish": [
      {
        "text": "Oreo Flotante No Identificada",
        "isItalic": false,
        "link": null
      }
    ],
    "englishDefinition": [
      {
        "text": "A mysterious cookie-shaped object drifting through deep space and confusing astronauts.",
        "isItalic": false,
        "link": null
      }
    ],
    "spanishDefinition": [
      {
        "text": "Un objeto misterioso con forma de galleta que flota por el espacio y confunde a los astronautas.",
        "isItalic": false,
        "link": null
      }
    ]
  }
]
```

---

# Using Google Sheets as a Backend

If you do not have your own backend API, you can use:

- Google Sheets
- Google Apps Script

This repository already includes templates to simplify the setup.

---

## Step 1 — Create the Spreadsheet

Inside the `/templates` folder you will find:

- `Terminology Template.csv`
- `Terminology Template.xlsx`

Both files contain the exact same structure.

### Instructions

1. Open Google Sheets
2. Create a new spreadsheet
3. Import either template file
4. Add your terminology data

### Important

Do not modify the column order.

The Apps Script parser depends on the existing structure.

---

## Step 2 — Configure Google Apps Script

Inside the spreadsheet:

```text
Extensions → Apps Script
```

### Replace the Default Script

1. Delete the default code
2. Open `/templates/Code.gs`
3. Copy its contents
4. Paste everything into the Apps Script editor

You can optionally rename the Apps Script project.

---

## Step 3 — Deploy the Apps Script Web App

Inside Apps Script:

```text
Deploy → New Deployment
```

### Deployment Configuration

Use the following settings:

| Setting         | Value   |
| --------------- | ------- |
| Deployment type | Web app |
| Execute as      | Me      |
| Who has access  | Anyone  |

### Why "Anyone"?

The browser extension must be able to fetch the terminology data publicly.

Users do not need access to your spreadsheet itself.

Only the Apps Script endpoint should be public.

---

## Step 4 — Authorize and Deploy

After clicking deploy:

1. Google will ask for authorization
2. Review permissions
3. Continue through the authorization flow
4. Finish deployment

Once completed, Google will provide a:

```text
WEB APP URL
```

Copy that URL.

---

## Step 5 — Configure the Extension

Open your `.env` file and set:

```env
VITE_API_URL=https://script.google.com/macros/s/XXXXXXXXXXXX/exec
```

Replace the URL with your deployed Apps Script Web App URL.

---

## Development Mode

Run the development server:

```bash
npm run dev
```

Depending on your extension tooling setup, you may still need to manually reload the extension inside Chrome after changes.

---

## Production Build

Build the extension:

```bash
npm run build
```

After the build completes, a `dist/` folder will be generated in the project root.

This folder contains the production-ready browser extension.

---

# Loading the Extension Locally in Chrome

You can test the extension locally before publishing it.

---

## Step 1 — Open Chrome Extensions

Open:

```text
chrome://extensions
```

Or navigate through:

```text
Chrome → Extensions → Manage Extensions
```

---

## Step 2 — Enable Developer Mode

Enable:

```text
Developer mode → ON
```

_(top-right corner)_

---

## Step 3 — Load the Extension

Click:

```text
Load unpacked
```

Select the generated `dist/` folder.

The extension should now appear in your browser.

---

# Publishing to the Chrome Web Store

We recommend publishing through the Chrome Web Store Developer Dashboard.

---

## Step 1 — Create a ZIP File

Most browser stores require a ZIP archive of the extension files.

Compress the contents of the `dist/` folder.

### Example Structure

```text
dist/
├── manifest.json
├── assets/
├── icons/
└── ...
```

### Important

- Zip the contents of `dist/`
- Do not zip the entire project folder

---

## Step 2 — Create a Developer Account

Open the Chrome Web Store Developer Dashboard.

Google may require a one-time developer registration fee.

---

## Step 3 — Create a New Item

Inside the dashboard:

```text
Add new item
```

Upload your ZIP file.

---

## Step 4 — Complete Store Listing Information

You will typically need:

- Extension name
- Description
- Screenshots
- Icons
- Privacy policy
- Support email

---

# Recommended Assets

## Icons

Recommended icon sizes:

- 16x16
- 32x32
- 48x48
- 128x128

---

## Screenshots

Recommended minimum size:

```text
1280x800
```

---

# Common Issues

## The Extension Loads but No Data Appears

Possible causes:

- Invalid `VITE_API_URL`
- Apps Script deployment permissions are incorrect
- API response format is invalid
- CORS restrictions
- Spreadsheet columns were modified

---

## Changes Do Not Appear After Editing `.env`

Vite environment variables are loaded during build time.

After changing `.env`, rebuild the extension:

```bash
npm run build
```

---

## Apps Script Returns Permission Errors

Verify the deployment settings:

| Setting        | Correct Value |
| -------------- | ------------- |
| Execute as     | Me            |
| Who has access | Anyone        |

Then redeploy the script.

---

# Recommended References

- Vite Documentation
- Chrome Extensions Documentation
- Google Apps Script Documentation
- Google Sheets Documentation

---

# License

This project is open source.
