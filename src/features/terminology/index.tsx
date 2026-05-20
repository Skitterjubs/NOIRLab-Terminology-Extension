import { useContext, useEffect, useState } from "react";
import browser from "webextension-polyfill";
import { SearchBar } from "@/components/ui/search-bar";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/features/terminology/columns";
import { globalFilterFn } from "@/features/terminology/globalFilterFn";
import { AppLoadingContext } from "@/contexts/app-loading-context";
import { BROWSER_MESSAGE_TYPES } from "@/lib/constants";
import type { Terminology } from "@/types/terminology";

export function Terminology() {
  const [terminology, setTerminology] = useState<Terminology[]>([]);
  const [search, setSearch] = useState("");

  const { setAppIsLoading } = useContext(AppLoadingContext);

  useEffect(() => {
    setAppIsLoading(true);

    async function getLatestTerminology() {
      const { latestTerminology }: { latestTerminology: Terminology[] | null } =
        await browser.runtime.sendMessage({
          type: BROWSER_MESSAGE_TYPES.GET_LATEST_TERMINOLOGY,
        });

      if (latestTerminology) {
        setTerminology(latestTerminology);
        setAppIsLoading(false);
        clearInterval(interval);
      }
    }

    //Retries until the storage has some terminology.
    const interval = setInterval(getLatestTerminology, 1000);
    getLatestTerminology();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col gap-2">
      <SearchBar setSearch={setSearch} />
      <DataTable
        columns={columns}
        data={terminology as Terminology[]}
        globalFilter={search}
        globalFilterFn={globalFilterFn}
        sorting={[{ id: "abbreviation", desc: true }]}
      />
    </div>
  );
}
