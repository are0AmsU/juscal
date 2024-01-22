import React from 'react'
import { CoordinatesType } from '../types';

interface IEditMapProviderProps {
  children: React.ReactNode;
}

export interface IEditMapContext {
  mapOnClick: ((coordinates: CoordinatesType) => void) | null;
  setMapOnClick: (func: ((coordinates: CoordinatesType) => void) | null) => void;
}

export const EditMapContext = React.createContext<IEditMapContext | null>(null)

export const useEditMapContext = (): IEditMapContext | null => {

  return React.useContext(EditMapContext) as IEditMapContext

}

export const EditMapProvider: React.FC<IEditMapProviderProps> = ({ children }) => {

  const [mapOnClick, setMapOnClick] = React.useState<((coordinates: CoordinatesType) => void) | null>(null)

  return (
    <EditMapContext.Provider value={{
      mapOnClick, setMapOnClick
    }}>
      {children}
    </EditMapContext.Provider>
  )
}