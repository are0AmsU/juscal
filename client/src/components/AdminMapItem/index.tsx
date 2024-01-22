import React from 'react'
import { IAdminMapItem } from './types'
import { REACT_APP_API_URL } from '../../consts'
import { IMap } from '../../ui/types'
import { IAdminPageContext, useAdminPageContext } from '../../ui/contexts/AdminPageContext'
import styles from './style.module.css'

const AdminMapItem: React.FC<IAdminMapItem> = ({ map }) => {

  const { setEditedMap } = useAdminPageContext() as IAdminPageContext

  const handleEditMapClick = React.useCallback((map: IMap): void => {
    setEditedMap(map)
  }, [setEditedMap])
  
  return (
    <div className={styles.item}>
      <h3>{map.name}</h3>
      <img src={REACT_APP_API_URL + map.img} alt={map.name + " Picture"} />
      <img src={REACT_APP_API_URL + map.preview} alt={map.name + " Picture"} />
      <button
        onClick={() => handleEditMapClick(map)}
      >
        Edit
      </button>
    </div>
  )
}

export default AdminMapItem