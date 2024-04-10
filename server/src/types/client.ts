import { CreateOptions } from "sequelize";
export interface ITargetClient {
  id: CreateOptions<number>;
  icon: string | null;
  type: string;
  nadeType: string | null;
  coordinates: number[];
  isSelected: boolean;
  isNadeTarget: boolean;
  nadeIds: CreateOptions<number>[];
}

export interface INadeClient {
  id: CreateOptions<number>;
  name: string | null;
  description: string | null;
  targetsIds: CreateOptions<number>[];
  photoPaths: string[];
  isSelected: boolean;
}

export interface IMapClient {
  id: CreateOptions<number>;
  name: string;
  img: string;
  preview: string;
}
