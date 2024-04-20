import React from "react";
import styles from "./style.module.css";
import AdminMapTargetForm from "../../../components/AdminMap/AdminMapTargetForm";
import AdminMapNadeForm from "../../../components/AdminMap/AdminMapNadeForm";
import {
  IAdminMapPageContext,
  useAdminMapPageContext,
} from "../../../ui/contexts/AdminMapPageContext";
import { createNade } from "../../../http/nadeApi";
import { INade, ITarget } from "../../../ui/types";
import { useParams } from "react-router-dom";
import { createTarget } from "../../../http/targetApi";
import generateRandomNumber from "../../../ui/helpers/generateRandomNumber";

const AdminMapForm: React.FC = () => {
  const { mapId } = useParams();
  const { nades, setNades, targets, setTargets } =
    useAdminMapPageContext() as IAdminMapPageContext;
  const currentNade = nades.find((nade) => nade.isSelected);
  const currentTarget = targets.find((target) => target.isSelected);

  const handleCreateTargetClick = async (): Promise<void> => {
    const target: ITarget = {
      id: generateRandomNumber(10),
      type: null,
      coordinates: [0, 0],
      isSelected: true,
      icon: null,
    };
    // const newTarget = await createTarget(mapId!, target);
    targets.forEach((trg) => (trg.isSelected = false));
    setTargets(targets.concat(target));
  };

  const handleCreateNadeClick = async (): Promise<void> => {
    const nade: INade = {
      id: generateRandomNumber(10),
      name: null,
      description: null,
      fromTargetId: null,
      toTargetId: null,
      photoPaths: [],
      isSelected: true,
    };
    nades.forEach((nd) => (nd.isSelected = false));
    setNades(nades.concat(nade));
    // const nade: INade = {
    //   id: -1,
    //   name: null,
    //   description: null,
    //   fromTargetId: null,
    //   toTargetId: null,
    //   photoPaths: [],
    //   isSelected: true,
    // };
    // const newNade = await createNade(mapId!, nade);
    // setNades(nades.concat(newNade));
  };

  return (
    <div className={styles.form}>
      <button onClick={handleCreateTargetClick}>Create target</button>
      <button onClick={handleCreateNadeClick}>Create Nade</button>
      {currentNade && <AdminMapNadeForm />}
      {currentTarget && <AdminMapTargetForm />}
    </div>
  );
};

export default AdminMapForm;
