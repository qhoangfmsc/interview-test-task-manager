import React, { createContext, useContext, useEffect, useState } from "react";
import { useAccountList } from "./AccountListContext";
import Loading from "../components/Loading";

const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
  const { accountList, isAccountLoading } = useAccountList();
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    if (!isAccountLoading && accountList) {
      let savedUser = localStorage.getItem("currentUser");
      savedUser = savedUser ? JSON.parse(savedUser) : accountList[1];
      setUser(savedUser);
    }
  }, [isAccountLoading, accountList]);

  const handleChangeUser = (newUser) => {
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    setUser(newUser);
  };

  if (isAccountLoading || !user) return <Loading />;

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
