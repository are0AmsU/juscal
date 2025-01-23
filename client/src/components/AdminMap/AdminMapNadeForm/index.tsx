import React from "react";
import { IMapContext, useMapContext } from "../../../ui/contexts/MapContext";
import { INade, INadeImg, TargetTypes } from "../../../ui/types";
import styles from "./styles.module.css";
import getImgUrlByFile from "../../../ui/helpers/getImgUrlByFile";
import {
  createNade,
  deleteNadeById,
  updateNade,
  updateNadeDescription,
  updateNadeName,
} from "../../../http/nadeApi";
import { useParams } from "react-router-dom";
import { INadePhoto } from "./types";
import {
  IAdminMapFormContext,
  useAdminMapFormContext,
} from "../../../ui/contexts/AdminMapFormContext";
import {
  createNadeImg,
  deleteNadeImg,
  replaceNadeImgIndexes,
} from "../../../http/nadeImgApi";
import { REACT_APP_API_URL } from "../../../consts";
import { getMaxIdFromMap } from "../../../ui/helpers/getMaxIdFromMap";

const AdminMapNadeForm: React.FC = () => {
  const { mapId } = useParams();
  const {
    targets,
    setTargets,
    nades,
    setNades,
    currentNade,
    setCurrentNadeId,
  } = useMapContext() as IMapContext;
  const { nadeNameInputRef, nadeDescriptionInputRef, inputTimerRef } =
    useAdminMapFormContext() as IAdminMapFormContext;
  const nadePhotoInputRef = React.useRef<HTMLInputElement>(null);

  const handleNadePhotoUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const setNewPhotoToNadePhotos = async () => {
      if (!currentNade) return;
      const inputElement = event.target as HTMLInputElement;
      const file = inputElement.files![0];
      inputElement.value = "";
      const formData = new FormData();
      formData.append("image", file);
      const nadeImg = await createNadeImg(currentNade.id, formData);
      currentNade.images.push(nadeImg);
      setNades((nades) => new Map(nades));
    };
    setNewPhotoToNadePhotos();
  };

  const handleDeleteNadeClick = async () => {
    if (!currentNade) return;
    await deleteNadeById(currentNade.id);
    nades.delete(currentNade.id);
    setNades((nades) => new Map(nades));
    setCurrentNadeId(getMaxIdFromMap(nades));
  };

  const handleNadeImgReplaceIndexes = async (
    firstNadeImg: INadeImg,
    secondNadeImg: INadeImg
  ) => {
    if (!currentNade) return;
    await replaceNadeImgIndexes(firstNadeImg.id, secondNadeImg.id);
    [firstNadeImg.index, secondNadeImg.index] = [
      secondNadeImg.index,
      firstNadeImg.index,
    ];
    currentNade.images.sort((a, b) => a.index - b.index);
    setNades((state) => new Map(state));
  };

  const handleNameInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      if (!currentNade) return;
      if (inputTimerRef.current) {
        clearTimeout(inputTimerRef.current);
      }

      inputTimerRef.current = setTimeout(async () => {
        currentNade.name =
          event.target.value.length > 0 ? event.target.value : null;
        await updateNadeName(currentNade.id, currentNade.name || "");
        setNades((nades) => new Map(nades));
      }, 1000);
    },
    [currentNade, inputTimerRef, setNades]
  );

  const handleDescriptionInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      if (!currentNade) return;
      if (inputTimerRef.current) {
        clearTimeout(inputTimerRef.current);
      }

      inputTimerRef.current = setTimeout(async () => {
        currentNade.description =
          event.target.value.length > 0 ? event.target.value : null;
        await updateNadeDescription(
          currentNade.id,
          currentNade.description || ""
        );
        setNades((nades) => new Map(nades));
      }, 1000);
    },
    [currentNade, inputTimerRef, setNades]
  );

  const handleDeleteNadeImgClick = async (nadeImgId: number) => {
    if (!currentNade) return;
    await deleteNadeImg(nadeImgId);
    currentNade.images = currentNade.images.filter(
      (nadeImage) => nadeImage.id !== nadeImgId
    );
    setNades((nades) => new Map(nades));
  };

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

  React.useEffect(() => {
    if (
      !currentNade ||
      !nadeNameInputRef.current ||
      !nadeDescriptionInputRef.current
    )
      return;
    nadeNameInputRef.current.value = currentNade.name || "";
    nadeDescriptionInputRef.current.value = currentNade.description || "";
  }, [currentNade, nadeDescriptionInputRef, nadeNameInputRef]);

  console.log(currentNade);

  if (!currentNade) return <></>;

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
      {currentNade && currentNade.toTargetId && currentNade.fromTargetId && (
        <div>
          <p>Photos</p>
          <input
            ref={nadePhotoInputRef}
            style={{ display: "none" }}
            type="file"
            onChange={handleNadePhotoUpload}
          />
          <div className={styles.nadeFormImgs}>
            <button onClick={() => nadePhotoInputRef.current?.click()}>
              ADD IMAGE
            </button>
            <ul className={styles.nadeFormImgList}>
              {currentNade.images.map((nadeImg, index) => (
                <li key={nadeImg.id} className={styles.nadeFormImg}>
                  <button
                    className={styles.nadeFormImgDeleteButton}
                    onClick={() => handleDeleteNadeImgClick(nadeImg.id)}
                  >
                    x
                  </button>
                  {nadeImg.index !== currentNade.images[0].index &&
                    currentNade.images.length > 1 && (
                      <button
                        className={styles.nadeFormImgButton}
                        onClick={() =>
                          handleNadeImgReplaceIndexes(
                            nadeImg,
                            currentNade.images[index - 1]
                          )
                        }
                      >
                        &lt;
                      </button>
                    )}
                  {nadeImg.index !==
                    currentNade.images[currentNade.images.length - 1].index &&
                    currentNade.images.length > 1 && (
                      <button
                        className={
                          styles.nadeFormImgButton +
                          " " +
                          styles.nadeFormImgRightButton
                        }
                        onClick={() =>
                          handleNadeImgReplaceIndexes(
                            nadeImg,
                            currentNade.images[index + 1]
                          )
                        }
                      >
                        &gt;
                      </button>
                    )}
                  <img
                    className={styles.nadeFormImgPic}
                    src={REACT_APP_API_URL + nadeImg.path}
                    alt={nadeImg.path + "Img"}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMapNadeForm;
