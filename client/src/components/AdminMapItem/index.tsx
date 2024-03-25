import React from 'react'
import { IAdminMapItem } from './types'
import { ADMIN_MAP_PAGE_PATH, REACT_APP_API_URL } from '../../consts'
import { IAdminPageContext, useAdminPageContext } from '../../ui/contexts/AdminPageContext'
import styles from './style.module.css'
import { deleteMapById } from '../../http/mapApi'
import { useNavigate } from 'react-router-dom'

const AdminMapItem: React.FC<IAdminMapItem> = ({ map }) => {

  const { setEditedMap, deleteMapFromLocalMapsById } = useAdminPageContext() as IAdminPageContext
  const navigate = useNavigate()

  const handleEditMapClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation()
    setEditedMap(map)
  }

  const handleDeleteClick = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    event.stopPropagation()
    const { id } = map
    await deleteMapById(id)
    deleteMapFromLocalMapsById(id)
  }

  const handleClick = (): void => {
    navigate(ADMIN_MAP_PAGE_PATH + map.id)
  }

  console.log(map)

  return (
    <div
      className={styles.item}
      onClick={handleClick}
    >
      <h3>{map.name}</h3>
      <img src={REACT_APP_API_URL + map.img} alt={map.name + " Picture"} />
      <img src={REACT_APP_API_URL + map.preview} alt={map.name + " Picture"} />
      <button
        onClick={handleEditMapClick}
      >
        Edit
      </button>
      <button
        onClick={handleDeleteClick}
      >
        Delete
      </button>
    </div>
  )
}

export default AdminMapItem