import React from 'react'
import styles from './style.module.css'
import { ITargetProps } from './types'
import { IGlobalContext, useGlobalContext } from '../../contexts/GlobalContext'
import { REACT_APP_API_URL } from '../../../consts'

const Target: React.FC<ITargetProps> = ({ info, isNadeTarget, onMouseUp, onMouseDown }) => {

  const { nadeStore } = useGlobalContext() as IGlobalContext

  return (
    <button
      className={styles.target + (info.isSelected ? ' ' + styles.targetSelected : '') + (isNadeTarget ? ' ' + styles.targetNade : '')}
      style={{
        left: `calc(50% - ${info.coordinates[0]}px)`,
        top: `calc(50% - ${info.coordinates[1]}px)`,
        transform: `translate(-50%, -50%)`,
        backgroundImage: info.iconPath ? `url(${REACT_APP_API_URL + info.iconPath})` : 'none'
      }}
      onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
    ></button>
  )
}

export default Target