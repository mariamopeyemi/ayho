import { createContext, useState } from "react";

export const AppContext = createContext({
  activePage: "",
});
const AppContextProvider = ({ children }) => {
  const [activePage, setActivePage] = useState("");
  return <AppContext.Provider value={{ activePage, setActivePage }}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
