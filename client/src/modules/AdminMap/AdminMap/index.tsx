import React from "react";
import Minimap from "../../../components/Map";
import { useParams } from "react-router-dom";
import { CoordinatesType, IMap, INade, ITarget } from "../../../ui/types";
import { IMapContext, useMapContext } from "../../../ui/contexts/MapContext";
import Target from "../../../ui/components/Target/idnex";
import {
  IUseSpacePressed,
  useSpacePressed,
} from "../../../ui/hooks/useSpacePressed";
import styles from "./style.module.css";
import NadeLine from "../../../ui/components/NadeLine";
import { getTargets, updateTargetCoordinates } from "../../../http/targetApi";
import { getMapInfo } from "../../../http/mapApi";
import { getNades } from "../../../http/nadeApi";
import { getMaxIdFromArray } from "../../../ui/helpers/getMaxIdFromArray";

const AdminMap: React.FC = () => {
  const { mapId } = useParams();
  const {
    targets,
    setTargets,
    nades,
    setNades,
    currentTarget,
    setCurrentTargetId,
    setCurrentNadeId,
    currentTargetId,
    currentNadeId,
    currentNade,
  } = useMapContext() as IMapContext;
  const [map, setMap] = React.useState<IMap | null>(null);
  const coordinatesTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  const isTargetMovingRef = React.useRef<boolean>(false);
  const isSpacePressedRef = useSpacePressed() as IUseSpacePressed;

  const handleTargetMouseUp = (
    event: React.MouseEvent<HTMLButtonElement>,
    target: ITarget
  ) => {
    isTargetMovingRef.current = false;
  };

  const handleTargetMouseDown = (
    event: React.MouseEvent<HTMLButtonElement>,
    target: ITarget
  ) => {
    if (isSpacePressedRef.current || !currentTarget) {
      return;
    }
    isTargetMovingRef.current = true;
    setCurrentTargetId(target.id);
  };

  const handleMapMouseMove = (currentCoordinates: CoordinatesType): void => {
    if (isSpacePressedRef.current || !currentTarget) {
      return;
    }
    if (isTargetMovingRef.current) {
      currentTarget.coordinates = currentCoordinates;
      setTargets((state) => new Map(state));
      if (coordinatesTimerRef.current) {
        clearTimeout(coordinatesTimerRef.current);
      }

      coordinatesTimerRef.current = setTimeout(async () => {
        await updateTargetCoordinates(
          currentTarget.id,
          currentTarget.coordinates
        );
      }, 100);
    }
  };

  const handleMapMouseDown = (
    coordinates: CoordinatesType,
    event: React.MouseEvent
  ): void => {
    if ((event.target as HTMLElement).tagName !== "BUTTON") {
      isTargetMovingRef.current = false;
    }
  };

  const handleMapMouseUp = (): void => {
    isTargetMovingRef.current = false;
  };

  const handleNadeLineClick = (nade: INade) => {};
  React.useEffect(() => {
    if (!mapId) return;
    Promise.all([getMapInfo(mapId), getTargets(mapId), getNades(mapId)]).then(
      ([mapData, targetsData, nadesData]) => {
        console.log(nadesData);
        setMap(mapData);
        setTargets(new Map(targetsData.map((target) => [target.id, target])));
        setCurrentTargetId(getMaxIdFromArray(targetsData));
        setNades(
          new Map(
            nadesData.map((nade) => {
              return [nade.id, nade];
            })
          )
        );
        setCurrentNadeId(getMaxIdFromArray(nadesData));
      }
    );
  }, [mapId, setCurrentNadeId, setCurrentTargetId, setNades, setTargets]);

  if (!map) {
    return <h2>Loading</h2>;
  }

  return (
    <Minimap
      info={map}
      onMouseMove={handleMapMouseMove}
      onMouseDown={handleMapMouseDown}
      onMouseUp={handleMapMouseUp}
    >
      {Array.from(nades.entries()).map(([id, nade]) => (
        <NadeLine
          key={nade.id}
          onClick={() => handleNadeLineClick(nade)}
          isSelected={id === currentNadeId}
          fromTarget={targets.get(nade.fromTargetId || Infinity)}
          toTarget={targets.get(nade.toTargetId || Infinity)}
        />
      ))}
      {Array.from(targets.entries()).map(([id, target]) => (
        <Target
          key={target.id}
          info={target}
          isCurrent={id === currentTargetId}
          isSelected={
            (currentNade &&
              (target.id === currentNade.fromTargetId ||
                target.id === currentNade.toTargetId)) ||
            false
          }
          onMouseUp={(event) => handleTargetMouseUp(event, target)}
          onMouseDown={(event) => handleTargetMouseDown(event, target)}
        />
      ))}
    </Minimap>
  );
};

export default AdminMap;
