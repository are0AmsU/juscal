import React from "react";
import {
  IAdminPageContext,
  useAdminPageContext,
} from "../../../ui/contexts/AdminPageContext";
import { getMaps } from "../../../http/mapApi";
import AdminMapItem from "../../../components/AdminMapItem";

const AdminMapList: React.FC = () => {
  const { maps, setMaps, setIsAddMapFormOpened, editedMap } =
    useAdminPageContext() as IAdminPageContext;

  const handleOpenAddMapFormClick = (): void => {
    setIsAddMapFormOpened(true);
  };

  React.useEffect(() => {
    const setExistsMaps = async () => {
      const maps = await getMaps();
      setMaps(maps);
    };
    setExistsMaps();
  }, [setMaps, editedMap]);

  return (
    <div>
      <h2>Maps</h2>
      {maps.map((map) => (
        <AdminMapItem key={map.id} map={map} />
      ))}
      <button onClick={handleOpenAddMapFormClick}>Open add form</button>
    </div>
  );
};

export default AdminMapList;
