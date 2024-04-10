import React from "react";
import { CSSVariables } from "../../../ui/types";
import styles from "./style.module.css";
import getCSSVariableByName from "../../../ui/helpers/getCSSVariableByName";
import {
  IGlobalContext,
  useGlobalContext,
} from "../../../ui/contexts/GlobalContext";
import { useParams } from "react-router-dom";
import AdminMapTargetForm from "../../../components/AdminMap/AdminMapTargetForm";
import AdminMapNadeForm from "../../../components/AdminMap/AdminMapNadeForm";

const AdminMapForm: React.FC = () => {
  const { mapId } = useParams();
  const { cssVariables } = useGlobalContext() as IGlobalContext;
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [notSavedEntitiesIds, setNotSavedEntitiesIds] = React.useState<{
    nades: number[];
    targets: number[];
  }>({ nades: [], targets: [] });

  return (
    <div
      className={styles.form}
      style={{
        top: getCSSVariableByName(cssVariables, CSSVariables.HEADER_HIGHT),
      }}
    >
      {isOpen ? (
        <>
          <AdminMapNadeForm setNotSavedEntitiesIds={setNotSavedEntitiesIds} />
          <AdminMapTargetForm setNotSavedEntitiesIds={setNotSavedEntitiesIds} />
        </>
      ) : (
        <button onClick={() => setIsOpen(true)}>Open Form</button>
      )}
    </div>
  );
};

export default AdminMapForm;
