import React from "react";
import Modal from "../../ui/components/Modal";
import { IMapContext, useMapContext } from "../../ui/contexts/MapContext";

const ViewNadeModal: React.FC = () => {
  const { currentNade, currentNadeId } = useMapContext() as IMapContext;
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsOpen(currentNadeId !== null);
  }, [currentNadeId]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      {currentNadeId && currentNade && (
        <>
          <h2>{currentNade.id}</h2>
        </>
      )}
    </Modal>
  );
};

export default ViewNadeModal;
