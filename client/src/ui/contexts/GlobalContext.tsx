import React from 'react'
import { ICssVariable, INadeStore } from '../types'

interface IGlobalContextProviderProps {
  children: React.ReactNode
}

export interface IGlobalContext {
  cssVariables: ICssVariable[];
  setCssVariables: (variableArray: ICssVariable[]) => void;
  nadeStore: INadeStore;
  setNadeStore: (nadeStore: INadeStore) => void;
}

const GlobalContext = React.createContext<IGlobalContext | null>(null)

export const useGlobalContext = (): IGlobalContext => {
  return React.useContext(GlobalContext) as IGlobalContext
}

export const GlobalContextProvider: React.FC<IGlobalContextProviderProps> = ({ children }) => {

  const [cssVariables, setCssVariables] = React.useState<ICssVariable[]>([])
  const [nadeStore, setNadeStore] = React.useState<INadeStore>({ nadeTypes: {}, targetTypes: {}, targetIcons: {} })

  return (
    <GlobalContext.Provider value={{
      cssVariables,
      setCssVariables,
      nadeStore,
      setNadeStore
    }}>
      {children}
    </GlobalContext.Provider>
  )
}