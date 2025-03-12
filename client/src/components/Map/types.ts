import React from "react";
import { CoordinatesType, IMap } from "../../ui/types";

export interface IMapProps {
  info: IMap;
  ref: React.RefObject<HTMLDivElement | null>;
  children?: React.ReactNode;
  onMouseMove?: (currentCoordinates: CoordinatesType) => void;
  onMouseDown?: (coordinates: CoordinatesType, event: React.MouseEvent) => void;
  onMouseUp?: () => void;
}

export interface IOnMouseDownDataRef {
  onMouseDownCoordinates: CoordinatesType;
  lastMapPositionCoordinates: CoordinatesType;
}

export enum MapCursors {
  GRAB = "grab",
  GRABBING = "grabbing",
  AUTO = "auto",
  DEFAULT = "default",
}
