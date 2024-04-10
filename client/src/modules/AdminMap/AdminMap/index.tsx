import React from "react";
import Map from "../../../components/Map";
import { useParams } from "react-router-dom";
import { CoordinatesType, IMap, ITarget } from "../../../ui/types";
import { getMapAndNadesAdnTargetsByMapId } from "../../../http/adminMapApi";
import {
  IAdminMapPageContext,
  useAdminMapPageContext,
} from "../../../ui/contexts/AdminMapPageContext";
import Target from "../../../ui/components/Target/idnex";
import {
  IUseSpacePressed,
  useSpacePressed,
} from "../../../ui/hooks/useSpacePressed";

const AdminMap: React.FC = () => {
  const { mapId } = useParams();
  const { targets, setTargets, nades, setNades } =
    useAdminMapPageContext() as IAdminMapPageContext;
  const [map, setMap] = React.useState<IMap | null>(null);
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
    if (isSpacePressedRef.current) {
      return;
    }
    isTargetMovingRef.current = true;
    const newTargets = [...targets];
    newTargets.forEach((trg) => {
      if (trg.id === target.id) {
        trg.isSelected = true;
        return;
      }
      trg.isSelected = false;
    });
    setTargets(newTargets);
  };

  const handleMapMouseMove = (curretCoordinates: CoordinatesType): void => {
    if (isSpacePressedRef.current) {
      return;
    }
    if (isTargetMovingRef.current) {
      const newTargets = [...targets];
      newTargets.forEach((trg) => {
        if (trg.isSelected) {
          trg.coordinates = curretCoordinates;
        }
      });
      setTargets(newTargets);
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

  React.useEffect(() => {
    getMapAndNadesAdnTargetsByMapId(mapId as string).then((data): void => {
      console.log(data);
      setMap(data.map);
      // setNades(data.nades);
      // setTargets(data.targets);
      setTargets([]);
      setNades([]);
    });
  }, [mapId, setNades, setTargets]);

  if (!map) {
    return <h2>Loading</h2>;
  }

  return (
    <Map
      info={map}
      onMouseMove={handleMapMouseMove}
      onMouseDown={handleMapMouseDown}
      onMouseUp={handleMapMouseUp}
    >
      {targets.map((target) => (
        <Target
          key={target.id}
          info={target}
          onMouseUp={(event) => handleTargetMouseUp(event, target)}
          onMouseDown={(event) => handleTargetMouseDown(event, target)}
        />
      ))}
    </Map>
  );
};

export default AdminMap;
