import React from 'react'
import logoIcon from './../../assets/logoIcon.svg'
import { Link } from 'react-router-dom'
import styles from './style.module.css'
import { routes } from '../../routes'

const Header: React.FC = () => {

  return (
    <header className={styles.header}>
      <div>
        {routes.map(({ path }) =>
          <Link key={path} to={path} className={styles.link}>
            {path.split('/')[1]}
          </Link>  
        )}
      </div>
      <Link className={styles.logo} to={'/'}>
        <img src={logoIcon} alt="Logo" />
      </Link>
    </header>
  )
}

export default Header