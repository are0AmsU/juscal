import React from 'react'
import logoIcon from './../../assets/logoIcon.svg'
import { Link } from 'react-router-dom'
import styles from './style.module.css'
import { routes } from '../../routes'
import { IGlobalContext, useGlobalContext } from '../../ui/contexts/GlobalContext'
import { CSSVariables } from '../../ui/types'

const Header: React.FC = () => {

  const { cssVariables, setCssVariables } = useGlobalContext() as IGlobalContext
  const headerRef = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    setCssVariables([...cssVariables, { name: CSSVariables.HEADER_HIGHT, value: headerRef.current?.offsetHeight + 'px' }])
  }, [headerRef.current])

  return (
    <header ref={headerRef} className={styles.header}>
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