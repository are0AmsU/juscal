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

export enum GrenadesTypes {
  HAE = 'hae',
  FLASH = 'flash',
  SMOKE = 'smoke',
  MOLOTOV = 'molotov'
}

export interface IRoute {
  path: string;
  page: React.FC;
  getPathWithParametr?: (parametr: string) => string;
}

export enum NadeTargetTypes {
  TO='to',
  FROM='from'
}

export interface INade {
  id: number;
  name: string
}