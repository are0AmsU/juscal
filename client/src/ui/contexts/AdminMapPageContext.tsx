import React from 'react'
import { INade, ITarget } from '../types'

export interface IAdminMapFormInfo {
  currentTarget: ITarget | null;
}

interface IAdminMapPageContextProps {
  children: React.ReactNode
}

export interface IAdminMapPageContext {
  targets: ITarget[];
  setTargets: React.Dispatch<React.SetStateAction<ITarget[]>>;
  nades: INade[];
  setNades: React.Dispatch<React.SetStateAction<INade[]>>;
}

const AdminMapPageContext = React.createContext<IAdminMapPageContext | null>(null)

export const useAdminMapPageContext = (): IAdminMapPageContext => {
  return React.useContext(AdminMapPageContext) as IAdminMapPageContext
}

export const AdminMapPageContextProvider: React.FC<IAdminMapPageContextProps> = ({ children }) => {

  const [targets, setTargets] = React.useState<ITarget[]>([])
  const [nades, setNades] = React.useState<INade[]>([])

  return (
    <AdminMapPageContext.Provider
      value={{
        targets,
        setTargets,
        nades,
        setNades
      }}
    >
      {children}
    </AdminMapPageContext.Provider>
  )
}