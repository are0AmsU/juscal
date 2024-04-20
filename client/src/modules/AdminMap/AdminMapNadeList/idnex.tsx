import React from "react";
import {
  IAdminMapPageContext,
  useAdminMapPageContext,
} from "../../../ui/contexts/AdminMapPageContext";
import styles from "./style.module.css";
import {
  IAdminMapFormContext,
  useAdminMapFormContext,
} from "../../../ui/contexts/AdminMapFormContext";

const AdminMapNadeList: React.FC = () => {
  const { nades, setNades } = useAdminMapPageContext() as IAdminMapPageContext;
  const { nadeNameInputRef, nadeDescriptionInputRef, inputTimerRef } =
    useAdminMapFormContext() as IAdminMapFormContext;
  const handleClick = (nadeId: number) => {
    if (inputTimerRef.current) {
      clearTimeout(inputTimerRef.current);
    }
    setNades((state) => {
      state.forEach((nade) => {
        nade.isSelected = false;
        if (nade.id === nadeId) {
          nade.isSelected = true;
          nadeNameInputRef.current!.value = nade.name!;
          nadeDescriptionInputRef.current!.value = nade.description!;
        }
      });
      return state.slice();
    });
  };

  return (
    <div className={styles.list}>
      {nades.map((nade) => (
        <div
          key={nade.id}
          className={styles.item}
          onClick={() => handleClick(nade.id)}
          style={{
            border: "4px solid " + (nade.isSelected ? "green" : "white"),
            opacity: nade.isSelected ? "100%" : "50%",
          }}
        >
          id: {nade.id} {nade.name && "name: " + nade.name}
        </div>
      ))}
    </div>
  );
};

export default AdminMapNadeList;
