import React from "react";
import Modal from "../../../ui/components/Modal";
import { IMapInfoForm } from "../../../ui/types";
import {
  IAdminPageContext,
  useAdminPageContext,
} from "../../../ui/contexts/AdminPageContext";
import { deleteMapById, updateMapById } from "../../../http/mapApi";

const AdminEditMapModal: React.FC = () => {
  const { editedMap, setEditedMap, deleteMapFromLocalMapsById } =
    useAdminPageContext() as IAdminPageContext;
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const newValuesRef = React.useRef<IMapInfoForm | null>(null);

  const handleNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    newValuesRef.current!.name = event.target.value;
  };

  const handleImgChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    newValuesRef.current!.image = event.target.files![0];
  };

  const handlePreviewChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    newValuesRef.current!.preview = event.target.files![0];
  };

  const handleDeleteClick = async (): Promise<void> => {
    const { id } = editedMap!;
    await deleteMapById(id);
    deleteMapFromLocalMapsById(id);
    setEditedMap(null);
    setIsOpen(false);
  };

  const handleUpdateClick = async () => {
    const { id, name, image, preview } = newValuesRef.current!;
    const newData: { [K in keyof IMapInfoForm]?: IMapInfoForm[K] } = {
      name,
      image,
      preview,
    };
    const isChangedMapInfo = Object.keys(newData).reduce(
      (total: boolean, current: string): boolean => {
        const correctKey = current as keyof typeof newData;
        if (newData[correctKey] !== editedMap![correctKey]) {
          total = true;
        }
        return total;
      },
      false
    );
    if (!isChangedMapInfo) {
      return;
    }
    const formData = new FormData();
    formData.append("name", name as string);
    formData.append("img", image as File);
    formData.append("preview", preview as File);
    await updateMapById(id!, formData);
    setEditedMap(null);
    setIsOpen(false);
  };

  const handleModalClose = () => {
    setEditedMap(null);
  };

  React.useEffect(() => {
    if (editedMap) {
      newValuesRef.current = {
        id: editedMap.id,
        name: editedMap.name,
        image: null,
        preview: null,
      };
      setIsOpen(true);
    } else {
      newValuesRef.current = null;
      setIsOpen(false);
    }
  }, [editedMap]);

  if (!editedMap) {
    return <></>;
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} onClose={handleModalClose}>
      <div>
        <label htmlFor="name">
          Name
          <input
            id="name"
            type="text"
            defaultValue={newValuesRef.current?.name}
            onChange={handleNameChange}
          />
        </label>
        <label style={{ color: "white" }} htmlFor="img">
          Img
          <input
            id="img"
            type="file"
            onChange={handleImgChange}
            placeholder="To load a new picture"
          />
        </label>
        <label style={{ color: "white" }} htmlFor="preview">
          Preview
          <input
            id="preview"
            type="file"
            onChange={handlePreviewChange}
            placeholder="To load a new picture"
          />
        </label>
        <button onClick={handleUpdateClick}>Update</button>
        <button onClick={handleDeleteClick}>Delete</button>
      </div>
    </Modal>
  );
};

export default AdminEditMapModal;
