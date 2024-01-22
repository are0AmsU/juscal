import React from 'react'
import { CoordinatesType } from '../../ui/types';

export interface IMapProps {
  children: React.ReactNode;
  onMapClick?: ((coordinates: CoordinatesType) => void) | null;
}

export interface IOnMouseDownDataRef {
  onMouseDownCoordinates: CoordinatesType;
  lastMapPositionCoordinates: CoordinatesType;
}

export enum MapCursors {
  GRAB = 'grab',
  GRABBING = 'grabbing'
}