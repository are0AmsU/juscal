import React from "react";
import { REACT_APP_API_URL } from "../../consts";
import { useViewNadeContext } from "../../ui/contexts/ViewNadeContext";

const ViewNadeImageFullscreen = () => {
  const { fullscreenImage, setFullscreenImage } = useViewNadeContext();

  const handleFullscreenClick = () => {
    setFullscreenImage(null);
  };

  if (!fullscreenImage) return <></>;
  return (
    <div
      onClick={handleFullscreenClick}
      style={{
        display: "flex",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
        padding: 50,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
      }}
    >
      <img
        style={{ cursor: "zoom-out" }}
        src={REACT_APP_API_URL + fullscreenImage.path}
        alt={"Fullscreen Image " + fullscreenImage.index}
      />
    </div>
  );
};

export default ViewNadeImageFullscreen;
