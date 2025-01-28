import React from "react";
import styles from "./style.module.css";
import { INadeLineProps } from "./types";

const NadeLine: React.FC<INadeLineProps> = ({
  onClick,
  isSelected,
  fromTarget,
  toTarget,
}) => {
  if (fromTarget && toTarget) {
    console.log(fromTarget.coordinates, toTarget.coordinates);
    return (
      <div
        onClick={onClick}
        className={styles.nadeLine + (isSelected ? " " + styles.selected : "")}
        style={{
          width: Math.sqrt(
            Math.pow(fromTarget.coordinates[0] - toTarget.coordinates[0], 2) +
              Math.pow(fromTarget.coordinates[1] - toTarget.coordinates[1], 2)
          ),
          left: (toTarget.coordinates[0] + fromTarget.coordinates[0]) / 2 + "%",
          top: (toTarget.coordinates[1] + fromTarget.coordinates[1]) / 2 + "%",
          transform: `translate(-50%, -50%) rotate(${
            Math.atan2(
              toTarget.coordinates[1] - fromTarget.coordinates[1],
              toTarget.coordinates[0] - fromTarget.coordinates[0]
            ) *
            (180 / Math.PI)
          }deg)`,
        }}
      ></div>
    );
  }

  return <></>;
};

export default NadeLine;
