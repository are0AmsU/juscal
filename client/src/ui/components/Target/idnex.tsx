import React from "react";
import styles from "./style.module.css";
import { ITargetProps } from "./types";

const Target: React.FC<ITargetProps> = ({
  info,
  isFormCurrentNade,
  onMouseUp,
  onMouseDown,
}) => {
  return (
    <button
      className={
        styles.target +
        (info.isSelected ? " " + styles.targetSelected : "") +
        (isFormCurrentNade ? " " + styles.targetNade : "")
      }
      style={{
        left: `calc(50% - ${info.coordinates[0]}px)`,
        top: `calc(50% - ${info.coordinates[1]}px)`,
        transform: `translate(-50%, -50%)`,
        backgroundImage: info.icon ? `url(${info.icon})` : "none",
      }}
      onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
    ></button>
  );
};

export default Target;
