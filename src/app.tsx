import { useContext } from "react";
import { Footer } from "@/components/shared/footer";
import { Loading } from "@/components/shared/loading";
import { Terminology } from "@/features/terminology";
import { LanguageProvider } from "@/contexts/language-context";
import {
  AppLoadingContext,
  AppLoadingProvider,
} from "@/contexts/app-loading-context";

function AppContent() {
  const { isAppLoading } = useContext(AppLoadingContext);

  return (
    <div className="relative w-[400px] h-[600px]">
      <Loading isVisible={isAppLoading} />
      <main className="h-full w-full flex flex-col p-2 gap-1.5">
        <div className="flex-1 overflow-hidden">
          <Terminology />
        </div>
        <Footer />
      </main>
    </div>
  );
}

function App() {
  return (
    <AppLoadingProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AppLoadingProvider>
  );
}

export default App;
