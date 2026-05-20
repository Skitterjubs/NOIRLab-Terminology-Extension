import { createContext, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

export const AppLoadingContext = createContext<{
  isAppLoading: boolean;
  setAppIsLoading: Dispatch<SetStateAction<boolean>>;
}>({
  isAppLoading: false,
  setAppIsLoading: () => {},
});

export const AppLoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isAppLoading, setAppIsLoading] = useState(false);

  return (
    <AppLoadingContext.Provider value={{ isAppLoading, setAppIsLoading }}>
      {children}
    </AppLoadingContext.Provider>
  );
};
