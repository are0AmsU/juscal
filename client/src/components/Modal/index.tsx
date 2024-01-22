import React from 'react'
import { IModalProps } from './types'
import CloseButton from '../../ui/components/CloseButton'
import styles from './style.module.css'

const Modal: React.FC<IModalProps> = ({ children, isOpen, setIsOpen, onClose = () => {} }) => {

  const handleCloseClick = () => {
    onClose()
    setIsOpen(false)
  }

  return (
    <div className={styles.modal} style={{ display: isOpen ? "block" : "none" }}>
      <CloseButton onClick={handleCloseClick} />
      {children}
    </div>
  )
}

export default Modal