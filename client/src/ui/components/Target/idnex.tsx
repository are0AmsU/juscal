import React from 'react'
import styles from './style.module.css'
import { ITargetProps } from './types'
import { targetIcons } from '../../../consts'

const Target: React.FC<ITargetProps> = ({ info, isNadeTarget, onMouseUp, onMouseDown }) => {

  return (
    <button
      className={styles.target + (info.isSelected ? ' ' + styles.targetSelected : '') + (isNadeTarget ? ' ' + styles.targetNade : '')}
      style={{
        left: `calc(50% - ${info.coordinates[0]}px)`,
        top: `calc(50% - ${info.coordinates[1]}px)`,
        transform: `translate(-50%, -50%)`,
        backgroundImage: info.nadeType ? `url(${targetIcons[info.nadeType]})` : 'none'
      }}
      onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
    ></button>
  )
}

export default Target