import React, { useState, createContext } from "react";

export const DrawerContext = createContext();

export const DrawerProvider = ({ children }) => {
   const [drawer, setDrawer] = useState({});

   function showDrawer(id) {
      setDrawer({
         [id]: true,
      });
   }

   function hideDrawer(id) {
      setDrawer({});
   }

   return (
      <DrawerContext.Provider value={{ drawer, showDrawer, hideDrawer }}>
         {children}
      </DrawerContext.Provider>
   );
};
