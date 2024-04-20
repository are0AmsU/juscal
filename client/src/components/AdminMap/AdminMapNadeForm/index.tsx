import React from "react";
import {
  IAdminMapPageContext,
  useAdminMapPageContext,
} from "../../../ui/contexts/AdminMapPageContext";
import { INade, TargetTypes } from "../../../ui/types";
import styles from "./styles.module.css";
import getImgUrlByFile from "../../../ui/helpers/getImgUrlByFile";
import { createNade, deleteNadeById } from "../../../http/nadeApi";
import { useParams } from "react-router-dom";
import { INadePhoto } from "./types";
import {
  IAdminMapFormContext,
  useAdminMapFormContext,
} from "../../../ui/contexts/AdminMapFormContext";

const AdminMapNadeForm: React.FC = () => {
  const { mapId } = useParams();
  const { targets, setTargets, nades, setNades } =
    useAdminMapPageContext() as IAdminMapPageContext;
  const { nadeNameInputRef, nadeDescriptionInputRef, inputTimerRef } =
    useAdminMapFormContext() as IAdminMapFormContext;
  const [nadePhotos, setNadePhotos] = React.useState<INadePhoto[]>([]);
  const nadePhotoInputRef = React.useRef<HTMLInputElement>(null);
  const currentNade = nades.find((nade) => nade.isSelected);
  const currentTarget = targets.find((target) => target.isSelected) || null;
  const fromNadeTarget =
    nades.find((nade) => nade.fromTargetId === currentTarget?.id) || null;
  const toNadeTarget =
    nades.find((nade) => nade.toTargetId === currentTarget?.id) || null;

  const handleNadePhotoUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const setNewPhotoToNadePhotos = async () => {
      const inputElement = event.target as HTMLInputElement;
      const file = inputElement.files![0];
      const url = await getImgUrlByFile(file);
      setNadePhotos(nadePhotos.concat({ url, file }));
      inputElement.value = "";
    };
    setNewPhotoToNadePhotos();
  };

  const handleDeleteNadeClick = async () => {
    // await deleteNadeById(currentNade?.id!);

    setNades((state) => {
      const newState = state.filter((nade) => nade.id !== currentNade?.id);
      if (newState.length > 0) {
        newState[newState.length - 1].isSelected = true;
      }
      return newState;
    });
  };

  const handleNameInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      if (inputTimerRef.current) {
        clearTimeout(inputTimerRef.current);
      }

      inputTimerRef.current = setTimeout(() => {
        currentNade!.name = event.target.value;
        setNades(nades.slice());
      }, 1000);
    },
    [currentNade, inputTimerRef, nades, setNades]
  );

  const handleDescriptionInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      if (inputTimerRef.current) {
        clearTimeout(inputTimerRef.current);
      }

      inputTimerRef.current = setTimeout(() => {
        currentNade!.description = event.target.value;
        setNades(nades.slice());
      }, 1000);
    },
    [currentNade, inputTimerRef, nades, setNades]
  );

  React.useEffect(() => {
    const nadeNameInputElement = nadeNameInputRef.current;
    const nadeDescriptionInputElement = nadeDescriptionInputRef.current;
    if (nadeNameInputElement && nadeDescriptionInputElement) {
      nadeNameInputElement.addEventListener(
        "input",
        handleNameInputChange as unknown as EventListener
      );
      nadeDescriptionInputElement.addEventListener(
        "input",
        handleDescriptionInputChange as unknown as EventListener
      );

      return () => {
        nadeNameInputElement.removeEventListener(
          "input",
          handleNameInputChange as unknown as EventListener
        );
        nadeDescriptionInputElement.removeEventListener(
          "input",
          handleDescriptionInputChange as unknown as EventListener
        );
      };
    }
  }, [
    handleNameInputChange,
    handleDescriptionInputChange,
    nadeNameInputRef,
    nadeDescriptionInputRef,
  ]);

  return (
    <div className={styles.nadeForm}>
      <h2>Current Nade Form</h2>
      <button onClick={handleDeleteNadeClick}>Delete Nade</button>
      <input
        ref={nadeNameInputRef}
        type="text"
        placeholder="Name"
        defaultValue={currentNade?.name || ""}
      />
      <input
        ref={nadeDescriptionInputRef}
        type="text"
        placeholder="Description"
        defaultValue={currentNade?.description || ""}
      />
      <p>Photos</p>
      <input
        ref={nadePhotoInputRef}
        type="file"
        onChange={handleNadePhotoUpload}
      />
      {nadePhotos && (
        <div className={styles.nadeFormImgs}>
          {nadePhotos.map((nadePhoto) => (
            <img
              className={styles.nadeFormImg}
              key={nadePhoto.url}
              src={nadePhoto.url}
              alt={nadePhoto.url + "Img"}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMapNadeForm;
