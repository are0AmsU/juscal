import React from 'react'
import { ITarget } from '../types'

interface IAdminMapPageContextProps {
  children: React.ReactNode
}

export interface IAdminMapPageContext {
  targets: ITarget[];
  setTargets: (targetArray: ITarget[]) => void;
  currentTarget: ITarget | null;
  setCurrentTarget: (target: ITarget | null) => void;
}

const AdminMapPageContext = React.createContext<IAdminMapPageContext | null>(null)

export const useAdminMapPageContext = (): IAdminMapPageContext => {
  return React.useContext(AdminMapPageContext) as IAdminMapPageContext
}

export const AdminMapPageContextProvider: React.FC<IAdminMapPageContextProps> = ({ children }) => {

  const [targets, setTargets] = React.useState<ITarget[]>([])
  const [currentTarget, setCurrentTarget] = React.useState<ITarget | null>(null)

  return (
    <AdminMapPageContext.Provider
      value={{
        targets,
        setTargets,
        currentTarget,
        setCurrentTarget
      }}
    >
      {children}
    </AdminMapPageContext.Provider>
  )
}