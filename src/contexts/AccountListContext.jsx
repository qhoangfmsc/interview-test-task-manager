import React, { createContext, useState, useEffect, useContext } from "react";
import { requestAxiosGet } from "../api/request";

const AccountListContext = createContext(undefined);

export const AccountListProvider = ({ children }) => {
  const [accountListContext, setAccountListContext] = useState([]);
  const [isAccountLoading, setAccountIsLoading] = useState(true);

  useEffect(() => {
    const fetchAccountList = async () => {
      try {
        const storedAccounts = localStorage.getItem("accountList");
        if (storedAccounts && storedAccounts !== "[]") {
          setAccountListContext(JSON.parse(storedAccounts));
        } else {
          const response = await requestAxiosGet("/mocks/accountList.json");
          setAccountListContext(response.data);
        }
      } catch (error) {
        console.error("Error loading mock accounts:", error);
      } finally {
        setAccountIsLoading(false);
      }
    };

    fetchAccountList();
  }, []);

  return (
    <AccountListContext.Provider
      value={{
        accountList: accountListContext,
        isAccountLoading,
      }}
    >
      {children}
    </AccountListContext.Provider>
  );
};

export const useAccountList = () => {
  const context = useContext(AccountListContext);
  if (!context)
    throw new Error("useAccountList must be used within a AccountListProvider");
  return context;
};
