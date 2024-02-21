export type CoordinatesType = [number, number]

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

export enum NadeTypes {
  HAE = 'hae',
  FLASH = 'flash',
  SMOKE = 'smoke',
  MOLOTOV = 'molotov'
}

export interface IRoute {
  path: string;
  page: React.FC;
}

export enum TargetTypes {
  TO = 'to',
  FROM = 'from'
}

export interface INade {
  id: number;
  name: string;
  description: string;
  targets: [ITarget, ITarget];
  screenshots: File[];
}

export interface ITarget {
  id: number;
  iconPath?: string;
  type: TargetTypes;
  nadeType: NadeTypes | null;
  coordinates: CoordinatesType;
  isSelected: boolean;
}

export enum CSSVariables {
  HEADER_HIGHT='header-height'
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
    [key in TargetTypes]?: TargetTypes
  };
  nadeTypes: {
    [key in NadeTypes]?: NadeTypes
  };
  targetIcons: {
    [key in NadeTypes]?: string
  };
}