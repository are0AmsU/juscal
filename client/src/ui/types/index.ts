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

export enum TargetTypes {
  HAE = "hae",
  FLASH = "flash",
  SMOKE = "smoke",
  MOLOTOV = "molotov",
}

export interface INade {
  id: number;
  name: string | null;
  description: string | null;
  fromTargetId: number | null;
  toTargetId: number | null;
  photoPaths: string[];
  isSelected: boolean;
}

export interface ITarget {
  id: number;
  icon: string | null;
  type: TargetTypes | null;
  coordinates: CoordinatesType;
  isSelected: boolean;
}

export enum CSSVariables {
  HEADER_HIGHT = "header-height",
}

export interface ICssVariable {
  name: CSSVariables;
  value: string;
}

export interface ITargetIcon {
  targetType: TargetTypes;
  path: string;
}

export interface INadeStore {
  targetTypes: {
    [key in TargetTypes]?: { id: number; name: TargetTypes };
  };
  nadeTypes: {
    [key in TargetTypes]?: { id: number; name: TargetTypes };
  };
  targetIcons: {
    [key in TargetTypes]?: { path: string; nadeTypeId: number };
  };
}

export type NotSavedEntitiesIdsType = { nades: number[]; targets: number[] };
