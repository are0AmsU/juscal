import React from "react";
import styles from "./style.module.css";
import AdminMapTargetForm from "../../../components/AdminMap/AdminMapTargetForm";
import AdminMapNadeForm from "../../../components/AdminMap/AdminMapNadeForm";
import { IMapContext, useMapContext } from "../../../ui/contexts/MapContext";
import { createNade } from "../../../http/nadeApi";
import { INade, ITarget } from "../../../ui/types";
import { useParams } from "react-router-dom";
import { createTarget } from "../../../http/targetApi";

const AdminMapForm: React.FC = () => {
  const { mapId } = useParams();
  const {
    nades,
    setNades,
    targets,
    setTargets,
    currentNadeId,
    setCurrentTargetId,
    setCurrentNadeId,
    currentTargetId,
  } = useMapContext() as IMapContext;

  const handleCreateTargetClick = async (): Promise<void> => {
    if (mapId) {
      const newTarget = await createTarget(mapId);
      targets.set(newTarget.id, newTarget);
      setTargets((state) => new Map(state));
      setCurrentTargetId(newTarget.id);
    }
  };

  const handleCreateNadeClick = async () => {
    if (mapId) {
      const newNade = await createNade(mapId);
      nades.set(newNade.id, newNade);
      setNades((state) => new Map(state));
      setCurrentNadeId(newNade.id);
    }
  };

  return (
    <div className={styles.form}>
      <button onClick={handleCreateTargetClick}>Create target</button>
      <button onClick={handleCreateNadeClick}>Create Nade</button>
      {currentTargetId && <AdminMapTargetForm />}
      {currentNadeId && <AdminMapNadeForm />}
    </div>
  );
};

export default AdminMapForm;
