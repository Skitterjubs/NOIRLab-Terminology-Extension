import browser from "webextension-polyfill";
import { BROWSER_ALARM_NAMES, BROWSER_MESSAGE_TYPES } from "./lib/constants";
import { SECRETS } from "./lib/secrets";
import { LANGUAGE, type LanguageCode } from "./types/language";

async function fetchAndStoreTerminology({
  timeout = 120000,
  retries = 3,
} = {}) {
  const log = "Fetching and storing terminology.";
  console.time(log);
  console.log(log);
  for (let attempt = 1; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const res = await fetch(SECRETS.apiURL, { signal });
      clearTimeout(timeoutId);
      const terminology = await res.json();

      await browser.storage.local.set({ latestTerminology: terminology });
      console.timeLog(log);
      break;
    } catch (err) {
      clearTimeout(timeoutId);
      console.error(
        `Tried to fetch terminology data but didn't succeded. Retrying.`,
      );
    }
  }
}

browser.runtime.onInstalled.addListener(async () => {
  await browser.storage.local.set({ language: LANGUAGE.ENG });
  await browser.alarms.create(BROWSER_ALARM_NAMES.FETCH_AND_STORE_TERMINOLOGY, {
    periodInMinutes: 5,
  });
  await fetchAndStoreTerminology();
});

browser.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === BROWSER_ALARM_NAMES.FETCH_AND_STORE_TERMINOLOGY) {
    console.log(
      `Alarm triggered: ${BROWSER_ALARM_NAMES.FETCH_AND_STORE_TERMINOLOGY}`,
    );
    await fetchAndStoreTerminology();
  }
});

browser.runtime.onMessage.addListener(async (msg: unknown) => {
  if (typeof msg !== "object" || msg === null) return;
  if (!("type" in msg)) return;

  if (msg.type === BROWSER_MESSAGE_TYPES.GET_LATEST_TERMINOLOGY) {
    const { latestTerminology } =
      await browser.storage.local.get("latestTerminology");
    return { latestTerminology };
  } else if (msg.type === BROWSER_MESSAGE_TYPES.TOGGLE_LANGUAGE) {
    const { language } = await browser.storage.local.get("language");

    let newLang: LanguageCode;

    if (language === LANGUAGE.ENG) newLang = LANGUAGE.ESP;
    else newLang = LANGUAGE.ENG;

    await browser.storage.local.set({ language: newLang });
    return { language: newLang };
  } else if (msg.type === BROWSER_MESSAGE_TYPES.GET_LANGUAGE) {
    const { language } = await browser.storage.local.get("language");
    return { language };
  }
});
