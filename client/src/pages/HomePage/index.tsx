import React from 'react'
import duneImg from './../../assets/previewMaps/duneImg.svg'
import { Link } from 'react-router-dom'
import styles from './style.module.css'

const previewMaps = [
  { title: 'Dune', img: duneImg }
]

const HomePage: React.FC = () => {
  return (
    <div>
      {previewMaps.map(map =>
        <Link key={map.title} to={'/map/' + map.title.toLocaleLowerCase()} className={styles.previewMap}>
          <img src={map.img} alt={map.title + ' map Icon'} />
          <h2>{map.title}</h2>
        </Link>  
      )}
    </div>
  )
}

export default HomePage