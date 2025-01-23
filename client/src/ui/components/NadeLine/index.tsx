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
    return (
      <div
        onClick={onClick}
        className={styles.nadeLine + (isSelected ? " " + styles.selected : "")}
        style={{
          width: Math.sqrt(
            Math.pow(fromTarget.coordinates[0] - toTarget.coordinates[0], 2) +
              Math.pow(fromTarget.coordinates[1] - toTarget.coordinates[1], 2)
          ),
          left: `calc(50% - ${
            fromTarget.coordinates[0] +
            0.5 * (toTarget.coordinates[0] - fromTarget.coordinates[0])
          }px)`,
          top: `calc(50% - ${
            toTarget.coordinates[1]! +
            0.5 * (fromTarget.coordinates[1] - toTarget.coordinates[1])
          }px)`,
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
