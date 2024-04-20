import React from "react";
import Map from "../../../components/Map";
import { useParams } from "react-router-dom";
import { CoordinatesType, IMap, INade, ITarget } from "../../../ui/types";
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
import styles from "./style.module.css";
import NadeLine from "../../../ui/components/NadeLine";

const AdminMap: React.FC = () => {
  const { mapId } = useParams();
  const { targets, setTargets, nades, setNades } =
    useAdminMapPageContext() as IAdminMapPageContext;
  const [map, setMap] = React.useState<IMap | null>(null);
  const isTargetMovingRef = React.useRef<boolean>(false);
  const isSpacePressedRef = useSpacePressed() as IUseSpacePressed;
  const currentNade = nades.find((nade) => nade.isSelected) || null;
  const currentTarget = targets.find((target) => target.isSelected) || null;
  const currentFromNadeTarget =
    targets.find((target) => target.id === currentNade?.fromTargetId) || null;
  const currentToNadeTarget =
    targets.find((target) => target.id === currentNade?.toTargetId) || null;

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

  const handleMapMouseMove = (currentCoordinates: CoordinatesType): void => {
    if (isSpacePressedRef.current) {
      return;
    }
    if (isTargetMovingRef.current) {
      currentTarget!.coordinates = currentCoordinates;
      setTargets(targets.slice());
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

  const handleNadeLineClick = (nade: INade) => {
    nades.forEach((nd) => (nd.isSelected = false));
    nade.isSelected = true;
    setNades(nades.slice());
  };

  console.log(nades, targets);

  React.useEffect(() => {
    getMapAndNadesAdnTargetsByMapId(mapId as string).then((data): void => {
      if (data.nades.length > 0) {
        data.nades[data.nades.length - 1].isSelected = true;
      }
      if (data.targets.length > 0) {
        data.targets[data.targets.length - 1].isSelected = true;
      }
      setMap(data.map);
      setNades(data.nades);
      setTargets(data.targets);
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
      {nades.map(
        (nade) =>
          nade.fromTargetId !== null &&
          nade.toTargetId !== null && (
            <NadeLine
              key={nade.id}
              onClick={() => handleNadeLineClick(nade)}
              isSelected={nade.isSelected}
              fromNadeTarget={
                targets.find((target) => target.id === nade.fromTargetId)!
              }
              toNadeTarget={
                targets.find((target) => target.id === nade.toTargetId)!
              }
            />
          )
      )}
      {targets.map((target) => (
        <Target
          key={target.id}
          info={target}
          isFormCurrentNade={
            target.id === currentNade?.fromTargetId ||
            target.id === currentNade?.toTargetId
          }
          onMouseUp={(event) => handleTargetMouseUp(event, target)}
          onMouseDown={(event) => handleTargetMouseDown(event, target)}
        />
      ))}
    </Map>
  );
};

export default AdminMap;
