import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreateOptions,
  ForeignKey,
} from "sequelize";

export * from "./client.js";

export interface IMulterFile {
  path: string;
}

interface ITargetType {
  id?: CreateOptions<number>;
  name: string;
}

export interface IMapModel
  extends Model<
    InferAttributes<IMapModel>,
    InferCreationAttributes<IMapModel>
  > {
  id?: CreateOptions<number>;
  name: string;
  img: string;
  preview: string;
  description: string;
}

export interface INadeModel
  extends Model<
    InferAttributes<INadeModel>,
    InferCreationAttributes<INadeModel>
  > {
  id?: CreateOptions<number>;
  name: string | null;
  description: string | null;
  mapId?: ForeignKey<number>;
}

export interface INadeTypeModel
  extends Model<
    InferAttributes<INadeTypeModel>,
    InferCreationAttributes<INadeTypeModel>
  > {
  id?: CreateOptions<number>;
  name: string;
  icon: string;
}

export interface INadeImgModel
  extends Model<
    InferAttributes<INadeImgModel>,
    InferCreationAttributes<INadeImgModel>
  > {
  id?: CreateOptions<number>;
  path: string;
  nadeId?: ForeignKey<number>;
}

export interface ITargetModel
  extends Model<
    InferAttributes<ITargetModel>,
    InferCreationAttributes<ITargetModel>
  > {
  id?: CreateOptions<number>;
  coordinateX: number;
  coordinateY: number;
  targetTypeId?: ForeignKey<number>;
  mapId?: ForeignKey<number>;
  target_type?: ITargetType;
}

export interface ITargetTypeModel
  extends ITargetType,
    Model<
      InferAttributes<ITargetTypeModel>,
      InferCreationAttributes<ITargetTypeModel>
    > {}

export interface INadeTargetModel
  extends Model<
    InferAttributes<INadeTargetModel>,
    InferCreationAttributes<INadeTargetModel>
  > {
  id?: CreateOptions<number>;
  nadeId?: ForeignKey<number>;
  targetId?: ForeignKey<number>;
}
