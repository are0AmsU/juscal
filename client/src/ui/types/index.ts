export type CoordinatesType = [number, number]

export interface IAddMapFormInfo {
  name: string;
  img: File | null;
  preview: File | null;
}

export interface IMap extends IAddMapFormInfo {
  id: number;
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
}

export enum NadeTargetTypes {
  TO='to',
  FROM='from'
}

export interface INade {
  id: number;
  name: string
}