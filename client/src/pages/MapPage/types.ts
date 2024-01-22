import { CoordinatesType } from '../../ui/types/index';
import React from 'react'

export interface IMapInfo {
  img: string;
  name: string;
}

export interface IMapPageProviderProps {
  children: React.ReactNode
}

export interface IOnMouseDownDataRef {
  onMouseDownCoordinates: CoordinatesType;
  lastMapPositionCoordinates: CoordinatesType;
}

export enum MapCursors {
  GRAB = 'grab',
  GRABBING = 'grabbing'
}