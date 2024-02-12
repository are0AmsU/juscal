import React from 'react'
import { ICssVariable } from '../types'

interface IGlobalContextProviderProps {
  children: React.ReactNode
}

export interface IGlobalContext {
  cssVariables: ICssVariable[];
  setCssVariables: (variableArray: ICssVariable[]) => void;
}

const GlobalContext = React.createContext<IGlobalContext | null>(null)

export const useGlobalContext = (): IGlobalContext => {
  return React.useContext(GlobalContext) as IGlobalContext
}

export const GlobalContextProvider: React.FC<IGlobalContextProviderProps> = ({ children }) => {

  const [cssVariables, setCssVariables] = React.useState<ICssVariable[]>([])

  return (
    <GlobalContext.Provider value={{
      cssVariables,
      setCssVariables
    }}>
      {children}
    </GlobalContext.Provider>
  )
}