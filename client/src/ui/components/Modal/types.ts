import React from "react"

export interface IModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (bool: boolean) => void;
  onClose?: () => void;
}