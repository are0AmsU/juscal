import React from "react";
import { IImage } from "../types";

interface IViewNadeContextProviderProps {
  children: React.ReactNode;
}

export interface IViewNadeContext {
  fullscreenImage: IImage | null;
  setFullscreenImage: React.Dispatch<React.SetStateAction<IImage | null>>;
}

const ViewNadeContext = React.createContext<IViewNadeContext | null>(null);

export const useViewNadeContext = () => {
  return React.useContext(ViewNadeContext) as IViewNadeContext;
};

export const ViewNadeContextProvider: React.FC<
  IViewNadeContextProviderProps
> = ({ children }) => {
  const [fullscreenImage, setFullscreenImage] = React.useState<IImage | null>(
    null
  );

  return (
    <ViewNadeContext.Provider value={{ fullscreenImage, setFullscreenImage }}>
      {children}
    </ViewNadeContext.Provider>
  );
};
