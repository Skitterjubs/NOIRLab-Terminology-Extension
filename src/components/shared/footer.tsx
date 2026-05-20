import { Switch } from "@/components/ui/switch";
import { Spain } from "@/components/icons/spain";
import { USA } from "@/components/icons/usa";
import { LanguageContext } from "@/contexts/language-context";
import { useContext, useEffect, useState } from "react";
import { LANGUAGE } from "@/types/language";

export function Footer() {
  const [latestVersion, setLatestVersion] = useState(null);
  const { lang, toggleLanguage } = useContext(LanguageContext);

  useEffect(() => {
    fetch("/manifest.json")
      .then((res) => res.json())
      .then((data) => setLatestVersion(data.version));
  }, []);

  return (
    <footer className="flex justify-between items-center">
      <div className="flex items-center justify-end gap-2">
        <USA />
        <Switch
          onCheckedChange={toggleLanguage}
          checked={lang === LANGUAGE.ESP}
        />
        <Spain />
      </div>
      <div className="flex flex-col items-end justify-center py-1 text-muted-foreground text-xs">
        <p>v{latestVersion}</p>
      </div>
    </footer>
  );
}
