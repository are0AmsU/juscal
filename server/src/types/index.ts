import { Model, InferAttributes, InferCreationAttributes, CreateOptions } from "sequelize"

export * from './client.js'

export interface IMulterFile {
  path: string
}

export interface IMap {
  id?: CreateOptions<number>
  name: string
  img: string
  preview: string
}

export interface INade {
  id?: CreateOptions<number>
  name: string
  description: string
  mapId?: CreateOptions<number>
  nadeTypeId?: CreateOptions<number>
}

export interface INadeType {
  id?: CreateOptions<number>
  name: string
}

export interface INadeImg {
  id?: CreateOptions<number>
  path: string
  nadeId?: CreateOptions<number>
}

export interface ITarget {
  id?: CreateOptions<number>
  coordinateX: number
  coordinateY: number
  targetTypeId?: CreateOptions<number>
  mapId?: CreateOptions<number>
}

export interface ITargetType {
  id?: CreateOptions<number>
  name: string
}

export interface INadeTarget {
  id?: CreateOptions<number>
  nadeId?: CreateOptions<number>
  targetId?: CreateOptions<number>
}

export interface IMapModel extends IMap, Model<InferAttributes<IMapModel>, InferCreationAttributes<IMapModel>> {}
export interface INadeModel extends INade, Model<InferAttributes<INadeModel>, InferCreationAttributes<INadeModel>> {}
export interface INadeTypeModel extends INadeType, Model<InferAttributes<INadeTypeModel>, InferCreationAttributes<INadeTypeModel>> {}
export interface INadeImgModel extends INadeImg, Model<InferAttributes<INadeImgModel>, InferCreationAttributes<INadeImgModel>> {}
export interface ITargetModel extends ITarget, Model<InferAttributes<ITargetModel>, InferCreationAttributes<ITargetModel>> {}
export interface ITargetTypeModel extends ITargetType, Model<InferAttributes<ITargetTypeModel>, InferCreationAttributes<ITargetTypeModel>> {}
export interface INadeTargetModel extends INadeTarget, Model<InferAttributes<INadeTargetModel>, InferCreationAttributes<INadeTargetModel>> {}