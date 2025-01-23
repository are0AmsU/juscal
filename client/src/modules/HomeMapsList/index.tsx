import React from "react";
import { IMap } from "../../ui/types";
import { getMaps } from "../../http/mapApi";
import { useNavigate } from "react-router-dom";
import { REACT_APP_API_URL } from "../../consts";
import styles from "./styles.module.css";

const HomeMapList: React.FC = () => {
  const navigate = useNavigate();
  const [maps, setMaps] = React.useState<IMap[]>([]);

  const handleMapItemClick = (mapId: number): void => {
    navigate("/map/" + mapId);
  };

  React.useEffect(() => {
    getMaps().then((data) => {
      setMaps(data);
    });
  }, []);

  return (
    <ul className={styles.homeMapList}>
      {maps.map((map) => (
        <li
          className={styles.homeMapItem}
          key={map.id}
          onClick={() => handleMapItemClick(map.id)}
        >
          <div className={styles.homeMapItemImgWrapper}>
            <img
              className={styles.homeMapItemImg}
              src={REACT_APP_API_URL + map.preview}
              alt={map.name + " Img"}
            />
          </div>
          <h3 className={styles.homeMapItemTitle}>{map.name}</h3>
        </li>
      ))}
    </ul>
  );
};

export default HomeMapList;
