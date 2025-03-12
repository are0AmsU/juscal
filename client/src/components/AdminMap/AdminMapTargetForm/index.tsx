import React from "react";
import { ITarget, TargetTypes } from "../../../ui/types";
import generateRandomNumber from "../../../ui/helpers/generateRandomNumber";
import { IMapContext, useMapContext } from "../../../ui/contexts/MapContext";
import styles from "./style.module.css";
import Select from "../../../ui/components/Select/idnex";
import { targetIcons } from "../../../consts";
import {
  createTarget,
  deleteTarget,
  updateTargetType,
} from "../../../http/targetApi";
import { useParams } from "react-router-dom";
import { createNade, updateNade } from "../../../http/nadeApi";
import { getMaxIdFromMap } from "../../../ui/helpers/getMaxIdFromMap";
import { getTargetTypeNames } from "../../../http/targetTypeApi";
import { flushSync } from "react-dom";
import {
  createNadeTarget,
  deleteNadeTarget,
} from "../../../http/nadeTargetApi";
import { IOption } from "../../../ui/components/Select/types";

const AdminMapTargetForm: React.FC = () => {
  const { mapId } = useParams();
  const {
    targets,
    setTargets,
    nades,
    setNades,
    currentTarget,
    currentTargetId,
    setCurrentTargetId,
    setCurrentNadeId,
    currentNade,
  } = useMapContext() as IMapContext;
  const [targetTypeNames, setTargetTypeNames] = React.useState<TargetTypes[]>(
    []
  );

  const handleDeleteTarget = async (): Promise<void> => {
    if (!currentTarget) return;
    await deleteTarget(currentTarget.id);
    nades.forEach((nade) => {
      if (
        nade.fromTargetId === currentTarget.id ||
        nade.toTargetId === currentTarget.id
      ) {
        nades.delete(nade.id);
        setCurrentNadeId(getMaxIdFromMap(nades));
      }
    });
    setNades((state) => new Map(state));
    targets.delete(currentTarget.id);
    setCurrentTargetId(getMaxIdFromMap(targets));
    setTargets((state) => new Map(state));
  };

  const handleSelectForNadeClick = async () => {
    if (currentNade && currentTarget) {
      await createNadeTarget(currentNade.id, currentTarget.id);
      if (currentTarget.type === null) {
        currentNade.fromTargetId = currentTarget.id;
      } else {
        currentNade.toTargetId = currentTarget.id;
      }
      setTargets((state) => new Map(state));
    }
  };

  const handleDeleteTargetFromNade = async () => {
    if (currentNade && currentTarget) {
      await deleteNadeTarget(currentNade.id, currentTarget.id);
      setTargets((state) => new Map(state));
    }
  };

  const handleTargetNadeTypeSelect = async (targetType: TargetTypes | null) => {
    if (!currentTarget || !currentNade) return;
    const newTarget = await updateTargetType(
      currentTarget.id,
      targetType,
      currentNade.fromTargetId === currentTarget.id ||
        currentNade.toTargetId === currentTarget.id
        ? currentNade.id
        : null
    );
    currentTarget.type = targetType;
    currentTarget.icon = newTarget.icon;
    setTargets((state) => new Map(state));
  };

  React.useEffect(() => {
    getTargetTypeNames().then((data) => setTargetTypeNames(data));
  }, []);

  const filterTargetTypeNames = (): IOption[] => {
    if (!currentTarget) return [];
    const isFromNadeWithPair = Array.from(nades.values()).reduce(
      (total, current) => {
        if (
          (current.toTargetId === currentTarget.id &&
            current.fromTargetId !== null) ||
          (current.fromTargetId === currentTarget.id &&
            current.toTargetId !== null)
        ) {
          return true;
        }
        return total;
      },
      false
    );
    if (isFromNadeWithPair) {
      if (currentTarget.type) {
        return [
          ...targetTypeNames
            .filter((name) => name !== currentTarget.type)
            .map((name) => ({ value: name, label: name })),
        ];
      }
      return [];
    }
    return [
      ...targetTypeNames
        .filter((name) => name !== currentTarget.type)
        .map((name) => ({ value: name, label: name })),
      { value: null, label: "none" },
    ];
  };

  if (!currentTarget) {
    return <></>;
  }

  return (
    <div className={styles.targetForm}>
      <h2>Current Target Form</h2>
      <button onClick={handleDeleteTarget}>Delete Target</button>
      {currentNade &&
        currentTarget &&
        ((currentTarget.type === null && currentNade.fromTargetId === null) ||
          (currentTarget.type !== null && currentNade.toTargetId === null)) && (
          <button onClick={handleSelectForNadeClick}>Select For Nade</button>
        )}
      {currentNade &&
        currentTarget &&
        (currentNade.fromTargetId === currentTarget.id ||
          currentNade.toTargetId === currentTarget.id) && (
          <button onClick={handleDeleteTargetFromNade}>
            Delete Target From Nade
          </button>
        )}
      {targetTypeNames.length > 0 && (
        <>
          <p>Select Target Type</p>
          <Select
            selectedOption={
              currentTarget.type
                ? {
                    value: currentTarget.type,
                    label: currentTarget.type as string,
                  }
                : { value: null, label: "none" }
            }
            onSelect={handleTargetNadeTypeSelect}
            options={filterTargetTypeNames()}
          />
        </>
      )}
    </div>
  );
};

export default AdminMapTargetForm;
