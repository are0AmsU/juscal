export interface ITargetClient {
  id: number;
  icon: string | null;
  type: string;
  nadeType: string | null;
  coordinates: number[];
  isSelected: boolean;
  isNadeTarget: boolean;
  nadeIds: number[];
}

export interface INadeClient {
  id: number;
  name: string;
  description: string;
  targetsIds: number[];
}