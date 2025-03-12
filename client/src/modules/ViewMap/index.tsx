import React from "react";
import { useParams } from "react-router-dom";
import Minimap from "../../components/Map";
import { IMapContext, useMapContext } from "../../ui/contexts/MapContext";
import Target from "../../ui/components/Target/idnex";
import { getMapInfo } from "../../http/mapApi";
import { IImage, IMap, ITarget } from "../../ui/types";
import { getFromTargets, getToTargets } from "../../http/targetApi";
import ViewNadeModal from "../../components/ViewNadeModal";
import NadeLine from "../../ui/components/NadeLine";
import { getNadeByTargetsIds } from "../../http/nadeApi";
import ViewNadeImageFullscreen from "../../components/ViewNadeImageFullscreen";
import { ViewNadeContextProvider } from "../../ui/contexts/ViewNadeContext";

type ViewMapParams = {
  mapId: string;
};

const ViewMap: React.FC = () => {
  const { mapId } = useParams<ViewMapParams>();
  const {
    nades,
    setNades,
    targets,
    setTargets,
    currentTargetId,
    setCurrentTargetId,
    currentTarget,
  } = useMapContext() as IMapContext;
  const [map, setMap] = React.useState<IMap | null>(null);
  const mapImgRef = React.useRef<HTMLDivElement>(null);
  const [imageFullscreen, setImageFullscreen] = React.useState<IImage | null>(
    null
  );

  const handleToTargetClick = (target: ITarget) => {
    if (target.id === currentTargetId) {
      setTargets(
        (state) =>
          new Map(state.entries().filter(([id, trg]) => trg.type !== null))
      );
      setCurrentTargetId(null);
      return;
    }
    getFromTargets(target.id).then((data) => {
      targets.forEach((trg) => {
        if (trg.type === null) {
          targets.delete(trg.id);
        }
      });
      data.forEach((fromTarget) => {
        targets.set(fromTarget.id, fromTarget);
      });
      setTargets((state) => new Map(state));
      setCurrentTargetId(target.id);
    });
  };

  const handleFromTargetClick = (fromTarget: ITarget) => {
    if (currentTargetId === null) return;
    getNadeByTargetsIds(fromTarget.id, currentTargetId).then((data) => {
      setNades(new Map(data.map((nade) => [nade.id, nade])));
    });
  };

  React.useEffect(() => {
    setTargets(new Map());
    setNades(new Map());
    setCurrentTargetId(null);
    if (!mapId) return;
    getMapInfo(mapId).then((data) => setMap(data));
    getToTargets(mapId).then((data) =>
      setTargets(new Map(data.map((target) => [target.id, target])))
    );
  }, [mapId, setCurrentTargetId, setNades, setTargets]);

  if (!map) return <></>;

  return (
    <>
      <ViewNadeContextProvider>
        <ViewNadeImageFullscreen />
        <ViewNadeModal />
      </ViewNadeContextProvider>
      <Minimap info={map} ref={mapImgRef}>
        {Array.from(
          targets.entries().filter(([id, target]) => target.type === null)
        ).map(([id, target]) => (
          <NadeLine
            key={target.id}
            fromTarget={target}
            toTarget={currentTarget}
            mapImgRef={mapImgRef}
          />
        ))}
        {Array.from(targets.entries()).map(([id, target]) => (
          <Target
            key={target.id}
            info={target}
            isCurrent={id === currentTargetId}
            onClick={() =>
              target.type === null
                ? handleFromTargetClick(target)
                : handleToTargetClick(target)
            }
            disabled={
              currentTargetId !== null &&
              currentTargetId !== id &&
              target.type !== null
            }
          />
        ))}
      </Minimap>
    </>
  );
};

export default ViewMap;
