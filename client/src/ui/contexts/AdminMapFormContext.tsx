import React from "react";

interface IAdminMapFormContextProps {
  children: React.ReactNode;
}

export interface IAdminMapFormContext {
  nadeNameInputRef: React.MutableRefObject<HTMLInputElement | null>;
  nadeDescriptionInputRef: React.MutableRefObject<HTMLInputElement | null>;
  inputTimerRef: React.MutableRefObject<NodeJS.Timeout | null>;
}

const AdminMapFormContext = React.createContext<IAdminMapFormContext | null>(
  null
);

export const useAdminMapFormContext = (): IAdminMapFormContext => {
  return React.useContext(AdminMapFormContext) as IAdminMapFormContext;
};

export const AdminMapFormContextProvider: React.FC<
  IAdminMapFormContextProps
> = ({ children }) => {
  const nadeNameInputRef = React.useRef<HTMLInputElement>(null);
  const nadeDescriptionInputRef = React.useRef<HTMLInputElement>(null);
  const inputTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  return (
    <AdminMapFormContext.Provider
      value={{
        nadeNameInputRef,
        nadeDescriptionInputRef,
        inputTimerRef,
      }}
    >
      {children}
    </AdminMapFormContext.Provider>
  );
};
