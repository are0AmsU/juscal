import React from "react";
import { ITarget, NadeTypes, TargetTypes } from "../../../ui/types";
import generateRandomNumber from "../../../ui/helpers/generateRandomNumber";
import {
  IAdminMapPageContext,
  useAdminMapPageContext,
} from "../../../ui/contexts/AdminMapPageContext";
import { IAdminMapTargetFormProps } from "./types";
import styles from "./style.module.css";
import getRandomElementFromArray from "../../../ui/helpers/getRandomElementFromArray";
import Select from "../../../ui/components/Select/idnex";
import { targetIcons } from "../../../consts";
import { createTarget, deleteTargetById } from "../../../http/targetApi";
import { useParams } from "react-router-dom";

const AdminMapTargetForm: React.FC<IAdminMapTargetFormProps> = ({
  setNotSavedEntitiesIds,
}) => {
  const { mapId } = useParams();
  const { targets, setTargets, nades } =
    useAdminMapPageContext() as IAdminMapPageContext;
  const currentTarget = targets.find((target) => target.isSelected);
  const currentNade = nades.find((nade) => nade);
  const fromNadeTarget = targets.find(
    (target) => target.isNadeTarget && target.type === TargetTypes.FROM
  );
  const toNadeTarget = targets.find(
    (target) => target.isNadeTarget && target.type === TargetTypes.TO
  );

  const handleCreateTargetClick = async (): Promise<void> => {
    const target: ITarget = {
      id: generateRandomNumber(10),
      type: TargetTypes.FROM,
      coordinates: [0, 0],
      isNadeTarget: false,
      isSelected: true,
      nadeType: null,
      icon: null,
      nadeIds: [],
    };
    const newTarget = await createTarget(mapId!, target);
    setTargets((state) => {
      state.forEach((trg) => {
        trg.isSelected = false;
      });
      state.push(newTarget);
      return state.slice();
    });
  };

  const handleDeleteTarget = async (): Promise<void> => {
    await deleteTargetById(currentTarget?.id as number);
    setTargets((state) => {
      const newState = state.filter(
        (target) => target.id !== currentTarget?.id
      );
      newState[0].isSelected = true;
      return newState;
    });
  };

  const handleAddTargetToCurrentNadeClick = (): void => {
    if (
      currentTarget === undefined ||
      currentNade === undefined ||
      (fromNadeTarget && toNadeTarget)
    ) {
      return;
    }
    if (
      (currentTarget.type === TargetTypes.FROM && fromNadeTarget) ||
      (currentTarget.type === TargetTypes.TO && toNadeTarget)
    ) {
      return;
    }
    currentTarget.isNadeTarget = true;
    setTargets(targets.slice());
  };

  const handleDeleteTargetFromFormClick = (): void => {
    if (currentTarget === undefined) {
      return;
    }
    currentTarget.isNadeTarget = false;
    setTargets(targets.slice());
  };

  const handleTargetTypeSelectOpenClick = (): void | boolean => {
    if (currentTarget === undefined) {
      return;
    }
    if (
      currentTarget?.id === fromNadeTarget?.id ||
      currentTarget?.id === toNadeTarget?.id
    ) {
      return true;
    }
  };

  const handleTargetTypeSelect = (targetType: string): boolean | void => {
    if (currentTarget === undefined) {
      return;
    }
    currentTarget.type = targetType as TargetTypes;
    if (currentTarget.type === TargetTypes.FROM) {
      currentTarget.nadeType = null;
      currentTarget.icon = null;
    } else {
      currentTarget.nadeType = NadeTypes.SMOKE;
      currentTarget.icon = targetIcons.smoke;
    }
    setTargets(targets.slice());
  };

  const handleTargetNadeTypeSelect = (targetNadeType: NadeTypes) => {
    if (currentTarget === undefined) {
      return;
    }
    currentTarget.nadeType = targetNadeType;
    currentTarget.icon = targetIcons[targetNadeType];
    setTargets(targets.slice());
  };

  return (
    <div>
      <button onClick={handleCreateTargetClick}>Create target</button>
      {currentTarget && (
        <div className={styles.targetForm}>
          <button onClick={handleDeleteTarget}>Delete Target</button>
          <button onClick={handleAddTargetToCurrentNadeClick}>
            Add Target To Form
          </button>
          {(currentTarget.id === fromNadeTarget?.id ||
            currentTarget.id === toNadeTarget?.id) && (
            <button onClick={handleDeleteTargetFromFormClick}>
              Delete Target From Form
            </button>
          )}
          <p>Select Target Type</p>
          <Select
            selectedOption={{
              value: currentTarget.type,
              label: currentTarget.type,
            }}
            onSelect={handleTargetTypeSelect}
            onOpen={handleTargetTypeSelectOpenClick}
            options={Object.values(TargetTypes).map((targetType) => {
              return { value: targetType, label: targetType };
            })}
          />
          {currentTarget.type === TargetTypes.TO && (
            <>
              <p>Select Nade Type</p>
              <Select
                selectedOption={{
                  value: currentTarget.nadeType
                    ? (currentTarget.nadeType as string)
                    : NadeTypes.SMOKE,
                  label: currentTarget.nadeType
                    ? (currentTarget.nadeType as string)
                    : NadeTypes.SMOKE,
                }}
                onSelect={handleTargetNadeTypeSelect}
                options={Object.values(NadeTypes).map((nadeType) => {
                  return { value: nadeType, label: nadeType };
                })}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminMapTargetForm;
