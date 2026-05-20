import {
  useContext,
  useEffect,
  useMemo,
  type Dispatch,
  type SetStateAction,
} from "react";
import debounce from "lodash.debounce";
import { Input } from "@/components/ui/input";
import { text } from "@/components/ui/text";
import { LanguageContext } from "@/contexts/language-context";

export function SearchBar({
  setSearch,
}: {
  setSearch: Dispatch<SetStateAction<string>>;
}) {
  const { lang } = useContext(LanguageContext);

  const debouncedSetSearch = useMemo(
    () => debounce((value: string) => setSearch(value), 300),
    [setSearch]
  );

  useEffect(() => {
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [debouncedSetSearch]);

  return (
    <div className="flex items-center justify-end w-full rounded-md">
      <Input
        placeholder={text.searchBar.placeholder[lang]}
        onChange={(e) => debouncedSetSearch(e.target.value)}
        className="text-sm"
      />
    </div>
  );
}
