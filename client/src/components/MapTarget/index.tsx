import React from 'react'
import styles from './style.module.css'
import flashIcon from './../../assets/nadesIcons/flashIcon.svg'
import haeIcon from './../../assets/nadesIcons/haeIcon.svg'
import smokeIcon from './../../assets/nadesIcons/smokeIcon.svg'
import molotovIcon from './../../assets/nadesIcons/molotovIcon.svg'
import { NadeTypes } from '../../ui/types'

const nadeIcons = {
  [NadeTypes.FLASH]: flashIcon,
  [NadeTypes.HAE]: haeIcon,
  [NadeTypes.MOLOTOV]: molotovIcon,
  [NadeTypes.SMOKE]: smokeIcon
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