import { ITarget } from "../../types";

export interface INadeLineProps {
  onClick?: () => void;
  isSelected?: boolean;
  fromTarget: ITarget | null;
  toTarget: ITarget | null;
  mapImgRef: React.RefObject<HTMLDivElement | null>;
}
