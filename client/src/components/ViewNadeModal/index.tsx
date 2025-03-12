import React from "react";
import Modal from "../../ui/components/Modal";
import { IMapContext, useMapContext } from "../../ui/contexts/MapContext";
import styles from "./style.module.css";
import ImageGallery from "../../ui/components/ImageGallery";

const ViewNadeModal: React.FC = () => {
  const { nades, setNades, currentTarget } = useMapContext() as IMapContext;
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const handleModalClose = () => {
    setNades(new Map());
  };

  React.useEffect(() => {
    setIsOpen(nades.size > 0);
  }, [nades]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} onClose={handleModalClose}>
      {currentTarget &&
        Array.from(nades).map(([id, nade]) => (
          <div key={id}>
            <h2 className={styles.text}>{nade.name}</h2>
            <p className={styles.text}>{nade.description}</p>
            <p className={styles.text}>type: {currentTarget.type}</p>
            <ImageGallery images={nade.images} />
          </div>
        ))}
    </Modal>
  );
};

export default ViewNadeModal;
