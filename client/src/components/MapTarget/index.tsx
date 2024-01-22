import React from 'react'
import styles from './style.module.css'
import flashIcon from './../../assets/nadesIcons/flashIcon.svg'
import haeIcon from './../../assets/nadesIcons/haeIcon.svg'
import smokeIcon from './../../assets/nadesIcons/smokeIcon.svg'
import molotovIcon from './../../assets/nadesIcons/molotovIcon.svg'
import { GrenadesTypes } from '../../ui/types'

const nadeIcons = {
  [GrenadesTypes.FLASH]: flashIcon,
  [GrenadesTypes.HAE]: haeIcon,
  [GrenadesTypes.MOLOTOV]: molotovIcon,
  [GrenadesTypes.SMOKE]: smokeIcon
}

const MapTarget: React.FC = () => {

  return ( <></>
    // <button
    //   className={styles.nade}
    //   style={{
    //     left: `calc(50% - ${info.coordinates[0]}px)`,
    //     top: `calc(50% - ${info.coordinates[1]}px)`,
    //     transform: `translate(-50%, -50%)`
    //   }}
    // >
    //   {info.icon &&
    //     <img
    //       className={styles.nadeImg}
    //       src={nadeIcons[GrenadesTypes.SMOKE]}
    //       alt={`${info.type} icon`}
    //     />
    //   }
    // </button>
  )
}

export default MapTarget