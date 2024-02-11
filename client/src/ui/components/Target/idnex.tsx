import React from 'react'
import styles from './style.module.css'
import { ITargetProps } from './types'

const Target: React.FC<ITargetProps> = ({ info, onMouseUp, onMouseDown }) => {
  return (
    <button
      className={styles.target + (info.isSelected ? ' ' + styles.targetSelected : '')}
      style={{
        left: `calc(50% - ${info.coordinates[0]}px)`,
        top: `calc(50% - ${info.coordinates[1]}px)`,
        transform: `translate(-50%, -50%)`
      }}
      onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
    >
      {info.iconPath &&
        <img
          className={styles.targetImg}
          src={info.iconPath}
          alt={'Nade Icon'}
        />
      }
    </button>
  )
}

export default Target