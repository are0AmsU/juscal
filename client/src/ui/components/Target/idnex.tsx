import React from "react";
import styles from "./style.module.css";
import { ITargetProps } from "./types";

const Target: React.FC<ITargetProps> = ({ info, onMouseUp, onMouseDown }) => {
  console.log(info);

  return (
    <button
      className={
        styles.target +
        (info.isSelected ? " " + styles.targetSelected : "") +
        (info.isNadeTarget ? " " + styles.targetNade : "")
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
