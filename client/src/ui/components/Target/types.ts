import React from "react";
import { ITarget } from "./../../types/index";

export interface ITargetProps {
  info: ITarget;
  isCurrent: boolean;
  isSelected?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseUp?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseDown?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
