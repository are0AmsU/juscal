import React from "react";
import styles from "./style.module.css";
import { INadeLineProps } from "./types";

const NadeLine: React.FC<INadeLineProps> = ({
  onClick,
  isSelected,
  fromNadeTarget,
  toNadeTarget,
}) => {
  return (
    <div
      onClick={onClick}
      className={styles.nadeLine + (isSelected ? " " + styles.selected : "")}
      style={{
        width: Math.sqrt(
          Math.pow(
            fromNadeTarget.coordinates[0]! - toNadeTarget.coordinates[0]!,
            2
          ) +
            Math.pow(
              fromNadeTarget.coordinates[1]! - toNadeTarget.coordinates[1]!,
              2
            )
        ),
        left: `calc(50% - ${
          fromNadeTarget.coordinates[0]! +
          0.5 * (toNadeTarget.coordinates[0]! - fromNadeTarget.coordinates[0]!)
        }px)`,
        top: `calc(50% - ${
          toNadeTarget.coordinates[1]! +
          0.5 * (fromNadeTarget.coordinates[1]! - toNadeTarget.coordinates[1]!)
        }px)`,
        transform: `translate(-50%, -50%) rotate(${
          Math.atan2(
            toNadeTarget.coordinates[1]! - fromNadeTarget.coordinates[1]!,
            toNadeTarget.coordinates[0]! - fromNadeTarget.coordinates[0]!
          ) *
          (180 / Math.PI)
        }deg)`,
      }}
    ></div>
  );
};

export default NadeLine;
