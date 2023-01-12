import { useState, useContext, createContext, useEffect } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
   const [userData, setUserData] = useState(null);
   const [isLoggedIn, setIsLoggedIn] = useState(false);

   useEffect(() => {
      if (JSON.parse(localStorage.getItem("AccessToken"))) {
         setIsLoggedIn(true);
      }
   }, []);

   const signOut = () => {
      setIsLoggedIn(false);
      localStorage.removeItem("AccessToken");
   };

   const setUserInfo = (data) => {
      const { user } = data;
      setIsLoggedIn(true);
      setUserData(user);
   };

   return (
      <UserContext.Provider
         value={{
            isLoggedIn,
            userData,
            setUserData,
            setUserState: (data) => setUserInfo(data),
            setIsLoggedIn,
            signOut,
         }}
      >
         {children}
      </UserContext.Provider>
   );
};

export const useUser = () => {
   return useContext(UserContext);
};
