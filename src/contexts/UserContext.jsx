import React, { createContext, useContext, useState } from "react";
import { accountList } from "../config/account/accountList";

const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
  let currentUser = localStorage.getItem("currentUser");
  currentUser = currentUser ? JSON.parse(currentUser) : accountList[1];
  const [user, setUser] = useState(currentUser);

  const handleChangeUser = (user) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
    setUser(user);
  };

  return (
    <UserContext.Provider value={{ user, handleChangeUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
