export type CoordinatesType = [number, number];

export interface IMapInfoForm {
  id?: number;
  name: string;
  img: File | null;
  preview: File | null;
}

export interface IMap {
  id: number;
  name: string;
  img: string;
  preview: string;
}

export interface IRoute {
  path: string;
  page: React.FC;
}

export enum NadeTypes {
  HAE = "hae",
  FLASH = "flash",
  SMOKE = "smoke",
  MOLOTOV = "molotov",
}

export enum TargetTypes {
  TO = "to",
  FROM = "from",
}

export interface INade {
  id: number;
  name: string | null;
  description: string | null;
  targetsIds: number[];
  photoPaths: string[];
  isSelected: boolean;
}

export interface ITarget {
  id: number;
  icon: string | null;
  type: TargetTypes;
  nadeType: NadeTypes | null;
  coordinates: CoordinatesType;
  isSelected: boolean;
  isNadeTarget: boolean;
  nadeIds: number[];
}

export enum CSSVariables {
  HEADER_HIGHT = "header-height",
}

export interface ICssVariable {
  name: CSSVariables;
  value: string;
}

export interface ITargetIcon {
  nadeType: NadeTypes;
  path: string;
}

export interface INadeStore {
  targetTypes: {
    [key in TargetTypes]?: { id: number; name: TargetTypes };
  };
  nadeTypes: {
    [key in NadeTypes]?: { id: number; name: NadeTypes };
  };
  targetIcons: {
    [key in NadeTypes]?: { path: string; nadeTypeId: number };
  };
}

export type NotSavedEntitiesIdsType = { nades: number[]; targets: number[] };
