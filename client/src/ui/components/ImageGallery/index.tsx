import React from "react";
import { IImageGalleryProps } from "./types";
import styles from "./style.module.css";
import { REACT_APP_API_URL } from "../../../consts";
import { useViewNadeContext } from "../../contexts/ViewNadeContext";

const ImageGallery: React.FC<IImageGalleryProps> = ({ images }) => {
  const { setFullscreenImage } = useViewNadeContext();
  const [activeImageIndex, setActiveImageIndex] = React.useState<number>(0);

  const handleImageClick = (index: number) => {
    setActiveImageIndex(index);
    setFullscreenImage(images[index]);
  };

  const handleToPreviousClick = () => {
    setActiveImageIndex(activeImageIndex - 1);
  };

  const handleToNextClick = () => {
    setActiveImageIndex(activeImageIndex + 1);
  };

  return (
    <div className={styles.gallery}>
      <div className={styles.active}>
        {activeImageIndex > 0 && (
          <button
            className={styles.activeButton}
            onClick={handleToPreviousClick}
          >
            &lt;
          </button>
        )}
        {activeImageIndex < images.length - 1 && (
          <button
            className={styles.activeButton}
            style={{ left: "auto", right: 0 }}
            onClick={handleToNextClick}
          >
            &gt;
          </button>
        )}
        <img
          style={{ cursor: "zoom-in" }}
          onClick={() => handleImageClick(activeImageIndex)}
          src={REACT_APP_API_URL + images[activeImageIndex].path}
          alt={"Active Nade Image " + images[activeImageIndex].index}
        />
      </div>
      <div className={styles.other}>
        {images.map(
          (image, index) =>
            index !== activeImageIndex && (
              <div key={image.id} className={styles.otherImage}>
                <img
                  src={REACT_APP_API_URL + image.path}
                  alt={"Nade Image " + image.index}
                  onClick={() => handleImageClick(index)}
                />
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
