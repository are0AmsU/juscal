import React from "react";
import { IMapContext, useMapContext } from "../../../ui/contexts/MapContext";
import styles from "./style.module.css";
import {
  IAdminMapFormContext,
  useAdminMapFormContext,
} from "../../../ui/contexts/AdminMapFormContext";
import { INade } from "../../../ui/types";

const AdminMapNadeList: React.FC = () => {
  const { nades, currentNade, currentNadeId, setCurrentNadeId } =
    useMapContext() as IMapContext;
  const { inputTimerRef } = useAdminMapFormContext() as IAdminMapFormContext;

  const handleClick = (nade: INade) => {
    if (!currentNade) return;
    if (inputTimerRef.current) {
      clearTimeout(inputTimerRef.current);
    }
    setCurrentNadeId(nade.id);
  };

  return (
    <div className={styles.list}>
      {Array.from(nades.entries()).map(([id, nade]) => (
        <div
          key={id}
          className={styles.item}
          onClick={() => handleClick(nade)}
          style={{
            border: "4px solid " + (id === currentNadeId ? "green" : "white"),
            opacity: id === currentNadeId ? "100%" : "50%",
          }}
        >
          id: {id} {nade.name && "name: " + nade.name}
        </div>
      ))}
    </div>
  );
};

export default AdminMapNadeList;
