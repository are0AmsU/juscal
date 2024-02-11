import React from "react"
import { IMap } from "../types"

interface AdminPageContextProviderProps {
  children: React.ReactNode
}

export interface IAdminPageContext {
  editedMap: IMap | null;
  setEditedMap: (map: IMap | null) => void;
  maps: IMap[];
  setMaps: (maps: IMap[]) => void;
  isAddMapFormOpened: boolean;
  setIsAddMapFormOpened: (bool: boolean) => void;
  deleteMapFromLocalMapsById: (mapId: number) => void;
}

export const AdminPageContext = React.createContext<IAdminPageContext | null>(null)

export const useAdminPageContext = (): IAdminPageContext => {

  return React.useContext(AdminPageContext) as IAdminPageContext

}

export const AdminPageContextProvider: React.FC<AdminPageContextProviderProps> = ({ children }) => {

  const [editedMap, setEditedMap] = React.useState<IMap | null>(null)
  const [maps, setMaps] = React.useState<IMap[]>([])
  const [isAddMapFormOpened, setIsAddMapFormOpened] = React.useState<boolean>(false)

  const deleteMapFromLocalMapsById = (mapId: number): void => {
    const filteredMaps = maps.filter(currentMap => currentMap.id !== mapId)
    setMaps(filteredMaps)
  }

  return (
    <AdminPageContext.Provider value={{
      editedMap,
      setEditedMap,
      maps,
      setMaps,
      isAddMapFormOpened,
      setIsAddMapFormOpened,
      deleteMapFromLocalMapsById
    }}>
      {children}
    </AdminPageContext.Provider>
  )
}