import React from "react";
import { useParams } from "react-router-dom";
import Minimap from "../../components/Map";
import { IMapContext, useMapContext } from "../../ui/contexts/MapContext";
import Target from "../../ui/components/Target/idnex";
import { getMapInfo } from "../../http/mapApi";
import { IMap, ITarget, TargetTypes } from "../../ui/types";
import { getTargets } from "../../http/targetApi";
import { getNades } from "../../http/nadeApi";
import { getMaxIdFromArray } from "../../ui/helpers/getMaxIdFromArray";
import ViewNadeModal from "../../components/ViewNadeModal";

type ViewMapParams = {
  mapId: string;
};

const ViewMap: React.FC = () => {
  const { mapId } = useParams<ViewMapParams>();
  const { targets, setTargets, setNades, currentTargetId, setCurrentTargetId } =
    useMapContext() as IMapContext;
  const [map, setMap] = React.useState<IMap | null>(null);

  const handleTargetClick = (target: ITarget) => {
    getTargets(mapId!, false, target.id).then((data) => {
      setTargets(new Map(data.map((target) => [target.id, target])));
      setCurrentTargetId(target.id);
    });
  };

  React.useEffect(() => {
    setCurrentTargetId(null);
    if (!mapId) return;
    getMapInfo(mapId).then((data) => setMap(data));
    getTargets(mapId, true).then((data) =>
      setTargets(new Map(data.map((target) => [target.id, target])))
    );
    getNades(mapId).then((data) =>
      setNades(new Map(data.map((nade) => [nade.id, nade])))
    );
  }, [mapId, setCurrentTargetId, setNades, setTargets]);

  if (!map) return <></>;

  return (
    <Minimap info={map}>
      {Array.from(targets.entries()).map(([id, target]) => (
        <Target
          key={target.id}
          info={target}
          isCurrent={id === currentTargetId}
          onClick={() => handleTargetClick(target)}
        />
      ))}
      <ViewNadeModal />
    </Minimap>
  );
};

export default ViewMap;
