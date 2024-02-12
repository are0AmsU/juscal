import React from 'react'
import { ITarget } from '../types'

export interface IAdminMapFormInfo {
  currentTarget: ITarget | null;
}

interface IAdminMapPageContextProps {
  children: React.ReactNode
}

export interface IAdminMapPageContext {
  targets: ITarget[];
  setTargets: (targetArray: ITarget[]) => void;
  currentTarget: ITarget | null;
  setCurrentTarget: (target: ITarget | null) => void;
  nadeTargets: ITarget[];
  setNadeTargets: (targetArray: ITarget[]) => void;
}

const AdminMapPageContext = React.createContext<IAdminMapPageContext | null>(null)

export const useAdminMapPageContext = (): IAdminMapPageContext => {
  return React.useContext(AdminMapPageContext) as IAdminMapPageContext
}

export const AdminMapPageContextProvider: React.FC<IAdminMapPageContextProps> = ({ children }) => {

  const [targets, setTargets] = React.useState<ITarget[]>([])
  const [currentTarget, setCurrentTarget] = React.useState<ITarget | null>(null)
  const [nadeTargets, setNadeTargets] = React.useState<ITarget[]>([])

  return (
    <AdminMapPageContext.Provider
      value={{
        targets,
        setTargets,
        currentTarget,
        setCurrentTarget,
        nadeTargets,
        setNadeTargets
      }}
    >
      {children}
    </AdminMapPageContext.Provider>
  )
}