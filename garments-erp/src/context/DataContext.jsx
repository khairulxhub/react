import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { seed } from "../data/seed";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [db, setDb] = useLocalStorage("gerp-db", seed);

  const setCollection = (key, items) =>
    setDb((prev) => ({ ...prev, [key]: items }));

  const resetData = () => setDb(seed);

  return (
    <DataContext.Provider value={{ db, setCollection, resetData }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
