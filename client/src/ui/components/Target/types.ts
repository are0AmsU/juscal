import React from 'react'
import { ITarget } from './../../types/index';

export interface ITargetProps {
  info: ITarget;
  onMouseUp?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseDown?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}