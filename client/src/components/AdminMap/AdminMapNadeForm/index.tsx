import React from "react";
import {
  IAdminMapPageContext,
  useAdminMapPageContext,
} from "../../../ui/contexts/AdminMapPageContext";
import { IAdminMapNadeFormProps, INadePhoto } from "./types";
import { INade, TargetTypes } from "../../../ui/types";
import generateRandomNumber from "../../../ui/helpers/generateRandomNumber";
import styles from "./styles.module.css";
import getImgUrlByFile from "../../../ui/helpers/getImgUrlByFile";
import { createNade } from "../../../http/nadeApi";
import { useParams } from "react-router-dom";

const AdminMapNadeForm: React.FC<IAdminMapNadeFormProps> = ({
  setNotSavedEntitiesIds,
}) => {
  const { mapId } = useParams();
  const { targets, setTargets, nades, setNades } =
    useAdminMapPageContext() as IAdminMapPageContext;
  const [nadePhotos, setNadePhotos] = React.useState<INadePhoto[]>([]);
  const nadeNameInputRef = React.useRef<HTMLInputElement>(null);
  const nadeDescriptionInputRef = React.useRef<HTMLInputElement>(null);
  const nadePhotoInputRef = React.useRef<HTMLInputElement>(null);
  const nadeTargets = targets.filter((target) => target.isNadeTarget);
  const currentNade = nades.find((nade) => nade.isSelected);
  const fromNadeTarget = targets.find(
    (target) => target.isNadeTarget && target.type === TargetTypes.FROM
  );
  const toNadeTarget = targets.find(
    (target) => target.isNadeTarget && target.type === TargetTypes.TO
  );

  const handleCreateNadeClick = async (): Promise<void> => {
    const name = nadeNameInputRef.current?.value;
    const description = nadeDescriptionInputRef.current?.value;
    const nade: INade = {
      id: generateRandomNumber(10),
      name: name || null,
      description: description || null,
      targetsIds: [],
      photoPaths: [],
      isSelected: true,
    };
    const newNade = await createNade(mapId!, nade);
    console.log(newNade);
    setNades(nades.concat(newNade));
  };

  const handleNadePhotoUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const setNewPhotoToNadePhotos = async () => {
      const inputElement = event.target as HTMLInputElement;
      const file = inputElement.files![0];
      const url = await getImgUrlByFile(file);
      setNadePhotos([...nadePhotos, { url, file }]);
      inputElement.value = "";
    };
    setNewPhotoToNadePhotos();
  };

  return (
    <div>
      <button onClick={handleCreateNadeClick}>Create Nade</button>
      {currentNade && (
        <>
          <p>Nade Name</p>
          <input ref={nadeNameInputRef} type="text" />
          <p>Nade Description</p>
          <input ref={nadeDescriptionInputRef} type="text" />
          <p>Nade Photos</p>
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
        </>
      )}
    </div>
  );
};

export default AdminMapNadeForm;
