import React from "react";
import styles from "./style.module.css";
import { IMapProps, IOnMouseDownDataRef, MapCursors } from "./types";
import { isArrayEqual } from "../../ui/helpers/isArrayEqual";
import { CoordinatesType } from "../../ui/types";
import { REACT_APP_API_URL } from "../../consts";
import { getClickCoordinatesByEvent } from "./helpers/getClickCoordinatesByEvent";
import {
  IUseSpacePressed,
  useSpacePressed,
} from "../../ui/hooks/useSpacePressed";

const Minimap: React.FC<IMapProps> = ({
  info,
  children,
  onMouseMove = null,
  onMouseDown = null,
  onMouseUp = null,
}) => {
  const [mapScale, setMapScale] = React.useState<number>(1);
  const [mapPosition, setMapPosition] = React.useState<CoordinatesType>([0, 0]);
  const [mapCursor, setMapCursor] = React.useState<MapCursors>(MapCursors.AUTO);
  const onMouseDownDataRef = React.useRef<IOnMouseDownDataRef>({
    onMouseDownCoordinates: [0, 0],
    lastMapPositionCoordinates: [0, 0],
  });
  const isMapMovingRef = React.useRef<boolean>(false);
  const isTargetPressedRef = React.useRef<boolean>(false);
  const isSpaceFirstPressedRef = React.useRef<boolean>(true);
  const mapRef = React.useRef<HTMLDivElement | null>(null);
  const mapImgRef = React.useRef<HTMLDivElement | null>(null);

  const onSpaceDown = () => {
    if (isMapMovingRef.current) {
      return;
    }
    setMapCursor(MapCursors.GRAB);
  };

  const onSpaceUp = () => {
    isSpacePressedRef.current = false;
    isMapMovingRef.current = false;
    setMapCursor(MapCursors.AUTO);
  };

  const isSpacePressedRef = useSpacePressed(
    onSpaceDown,
    onSpaceUp
  ) as IUseSpacePressed;

  const handleMapWheel = (event: React.WheelEvent<HTMLDivElement>): void => {
    if (event.deltaY < 0 && mapScale < 3) {
      setMapScale(mapScale + 0.1);
      return;
    }
    if (event.deltaY > 0 && mapScale > 1) {
      setMapScale(mapScale - 0.1);
      return;
    }
  };

  const handleMapMouseMove = (
    event: React.MouseEvent<HTMLDivElement>
  ): void => {
    if (onMouseMove) {
      const currentCordinates = getClickCoordinatesByEvent(
        event,
        mapScale,
        mapImgRef.current
      );
      onMouseMove(currentCordinates);
    }
    if (event.buttons === 1 && isSpacePressedRef.current) {
      isMapMovingRef.current = true;
      if (
        isArrayEqual(onMouseDownDataRef.current.onMouseDownCoordinates, [0, 0])
      ) {
        onMouseDownDataRef.current.onMouseDownCoordinates = [
          event.clientX,
          event.clientY,
        ];
        onMouseDownDataRef.current.lastMapPositionCoordinates = [
          mapPosition[0],
          mapPosition[1],
        ];
      }
      setMapCursor(MapCursors.GRABBING);
      const newCoordinates = {
        x:
          onMouseDownDataRef.current.lastMapPositionCoordinates[0] +
          (event.clientX -
            onMouseDownDataRef.current.onMouseDownCoordinates[0]),
        y:
          onMouseDownDataRef.current.lastMapPositionCoordinates[1] +
          (event.clientY -
            onMouseDownDataRef.current.onMouseDownCoordinates[1]),
      };
      if (
        Math.abs(newCoordinates.y) > mapImgRef.current!.offsetHeight ||
        Math.abs(newCoordinates.x) > mapImgRef.current!.offsetWidth / 1.5
      ) {
        return;
      }
      setMapPosition([newCoordinates.x, newCoordinates.y]);
      return;
    }
    onMouseDownDataRef.current = {
      onMouseDownCoordinates: [0, 0],
      lastMapPositionCoordinates: [0, 0],
    };
    if (isSpacePressedRef.current) {
      setMapCursor(MapCursors.GRAB);
      return;
    }
    setMapCursor(MapCursors.AUTO);
  };

  const handleMapMouseDown = (
    event: React.MouseEvent<HTMLDivElement>
  ): void => {
    if (onMouseDown) {
      const currentCoordinates = getClickCoordinatesByEvent(
        event,
        mapScale,
        mapImgRef.current
      );
      onMouseDown(currentCoordinates, event);
    }
  };

  const handleMapMouseUp = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (onMouseUp) {
      onMouseUp();
    }
  };

  return (
    <div className={styles.wrapper}>
      <div
        ref={mapRef}
        className={styles.mapContainer}
        onMouseMove={handleMapMouseMove}
        onWheel={handleMapWheel}
        onMouseDown={handleMapMouseDown}
        onMouseUp={handleMapMouseUp}
      >
        <div
          ref={mapImgRef}
          className={styles.mapImg}
          style={{
            cursor: mapCursor,
            transform: `scale(${mapScale}) translate(${
              mapPosition[0] / mapScale
            }px, ${mapPosition[1] / mapScale}px)`,
          }}
        >
          {children}
          <img
            src={REACT_APP_API_URL + info.image.split("\\").join("/")}
            alt={info.name + " Image"}
          />
        </div>
      </div>
    </div>
  );
};

export default Minimap;
