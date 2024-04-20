import React from "react";
import { ITarget, TargetTypes } from "../../../ui/types";
import generateRandomNumber from "../../../ui/helpers/generateRandomNumber";
import {
  IAdminMapPageContext,
  useAdminMapPageContext,
} from "../../../ui/contexts/AdminMapPageContext";
import styles from "./style.module.css";
import Select from "../../../ui/components/Select/idnex";
import { targetIcons } from "../../../consts";
import { createTarget, deleteTargetById } from "../../../http/targetApi";
import { useParams } from "react-router-dom";

const AdminMapTargetForm: React.FC = () => {
  const { mapId } = useParams();
  const { targets, setTargets, nades, setNades } =
    useAdminMapPageContext() as IAdminMapPageContext;
  const currentTarget = targets.find((target) => target.isSelected) || null;
  const currentNade = nades.find((nade) => nade.isSelected) || null;

  const handleDeleteTarget = async (): Promise<void> => {
    // await deleteTargetById(currentTarget?.id as number);
    setTargets((state) => {
      const newState = state.filter(
        (target) => target.id !== currentTarget?.id
      );
      if (newState.length > 0) {
        newState[newState.length - 1].isSelected = true;
      }
      return newState;
    });
    if (currentTarget?.type === null) {
      currentNade!.fromTargetId = null;
    } else {
      currentNade!.toTargetId = null;
    }
    setNades(nades.slice());
  };

  const handleAddFromTargetToCurrentNadeClick = (): void => {
    if (currentTarget?.type === null) {
      currentNade!.fromTargetId = currentTarget.id;
    } else {
      currentNade!.toTargetId = currentTarget!.id;
    }
    setTargets(targets.slice());
  };

  const handleDeleteTargetFromFormClick = (): void => {
    if (currentTarget?.type === null) {
      currentNade!.fromTargetId = null;
    } else {
      currentNade!.toTargetId = null;
    }
    setNades(nades.slice());
  };

  const handleTargetNadeTypeSelect = (targetType: TargetTypes) => {
    currentTarget!.type = targetType;
    currentTarget!.icon = targetIcons[targetType] || null;
    setTargets(targets.slice());
  };

  return (
    <div className={styles.targetForm}>
      <h2>Current Target Form</h2>
      <button onClick={handleDeleteTarget}>Delete Target</button>
      {((currentNade?.fromTargetId === null && currentTarget?.type === null) ||
        (currentNade?.toTargetId === null && currentTarget?.type !== null)) && (
        <button onClick={handleAddFromTargetToCurrentNadeClick}>
          Add From Target To Nade
        </button>
      )}
      {(currentNade?.fromTargetId === currentTarget?.id ||
        currentNade?.toTargetId === currentTarget?.id) && (
        <button onClick={handleDeleteTargetFromFormClick}>
          Delete Target From Form
        </button>
      )}
      <p>Select Target Type</p>
      <Select
        selectedOption={
          currentTarget?.type
            ? { value: currentTarget.type, label: currentTarget.type as string }
            : { value: null, label: "none" }
        }
        onSelect={handleTargetNadeTypeSelect}
        options={[
          ...Object.values(TargetTypes).map((targetType) => ({
            value: targetType,
            label: targetType,
          })),
          { value: null, label: "none" },
        ]}
      />
    </div>
  );
};

export default AdminMapTargetForm;
