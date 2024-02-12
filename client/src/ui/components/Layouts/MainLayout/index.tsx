import React from 'react'
import { IMainLayoutProps } from './types'
import styles from './styles.module.css'
import { IGlobalContext, useGlobalContext } from '../../../contexts/GlobalContext'
import { CSSVariables } from '../../../types'
import getCSSVariableByName from '../../../helpers/getCSSVariableByName'

const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {

  const { cssVariables } = useGlobalContext() as IGlobalContext

  return (
    <div className={styles.wrapper}>
      <main
        style={{ paddingTop: getCSSVariableByName(cssVariables, CSSVariables.HEADER_HIGHT) }}
        className={styles.main}
      >
        {children}
      </main>
    </div>
  )
}

export default MainLayout