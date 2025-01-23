import { ITarget } from "../../types";

export interface INadeLineProps {
  onClick: () => void;
  isSelected: boolean;
  fromTarget: ITarget | undefined;
  toTarget: ITarget | undefined;
}
