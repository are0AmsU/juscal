import React from "react";
import { IModalProps } from "./types";
import CloseButton from "../CloseButton";
import styles from "./style.module.css";

const Modal: React.FC<IModalProps> = ({
  children,
  isOpen,
  setIsOpen,
  onClose = () => {},
}) => {
  const modalRef = React.useRef<HTMLDivElement>(null);

  const handleCloseClick = () => {
    onClose();
    setIsOpen(false);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      ref={modalRef}
      className={styles.modal}
      style={{ display: isOpen ? "flex" : "none" }}
    >
      <CloseButton onClick={handleCloseClick} />
      {children}
    </div>
  );
};

export default Modal;
