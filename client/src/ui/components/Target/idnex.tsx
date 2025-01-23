import React from "react";
import styles from "./style.module.css";
import { ITargetProps } from "./types";
import { REACT_APP_API_URL } from "../../../consts";

const Target: React.FC<ITargetProps> = ({
  info,
  isCurrent,
  isSelected,
  onClick,
  onMouseUp,
  onMouseDown,
}) => {
  return (
    <button
      className={
        styles.target +
        (isCurrent ? " " + styles.targetSelected : "") +
        (isSelected ? " " + styles.targetNade : "")
      }
      style={{
        left: info.coordinates[0] + "%",
        top: info.coordinates[1] + "%",
        transform: `translate(-50%, -50%)`,
        backgroundImage: info.icon
          ? `url(${REACT_APP_API_URL + info.icon})`
          : "none",
      }}
      onClick={onClick}
      onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
    ></button>
  );
};

export default Target;
