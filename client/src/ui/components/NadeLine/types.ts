import { ITarget } from "../../types";

export interface INadeLineProps {
  onClick: () => void;
  isSelected: boolean;
  fromNadeTarget: ITarget;
  toNadeTarget: ITarget;
}
