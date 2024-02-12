import React from 'react'
import { ITarget } from './../../types/index';

export interface ITargetProps {
  info: ITarget;
  isNadeTarget: boolean;
  onMouseUp?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseDown?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}