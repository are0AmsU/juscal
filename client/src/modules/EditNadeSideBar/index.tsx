import React from 'react'
import styles from './style.module.css'
import { CoordinatesType, GrenadesTypes, NadeTargetTypes } from '../../ui/types'
import { IEditMapContext, useEditMapContext } from '../../ui/contexts/EditMapContext'

const EditMapSideBar: React.FC = () => {

  const { mapOnClick, setMapOnClick } = useEditMapContext() as IEditMapContext
  const [formError, setFormError] = React.useState<string | null>(null)

  const handleAddClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    
  }

  const handleSetFromTargetClick = (): void => setMapOnClick(() => {
    
  })

  const handleSetToTargetClick = (): void => setMapOnClick(() => {
    return (toTargetCoordinates: CoordinatesType): void => {
     
    }
  })

  return (
    <div
      className={styles.sidebar}
    >
      <div>
        
      </div>
      <button
        onClick={handleAddClick}
      >
        Add Nade
      </button>
      <button>
        Edit Nade
      </button>
      {formError &&
        <div style={{ backgroundColor: 'black', padding: 10 }}>
          <button onClick={() => setFormError(null)}>X</button>
          <p style={{ color: 'white' }}>{formError}</p>
        </div>
      }
    </div>
  )
}

export default EditMapSideBar