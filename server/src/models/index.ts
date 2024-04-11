import sequelize from "../db.js";
import {
  CreateOptions,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import {
  IMapModel,
  INadeImgModel,
  INadeModel,
  INadeTargetModel,
  ITargetTypeModel,
  ITargetModel,
} from "../types/index.js";

const Map = sequelize.define<IMapModel>(
  "map",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: false, allowNull: false },
    img: { type: DataTypes.STRING, unique: false, allowNull: false },
    preview: { type: DataTypes.STRING, unique: false, allowNull: false },
  },
  { tableName: "maps" }
);

const Nade = sequelize.define<INadeModel>(
  "nade",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.STRING, allowNull: true },
  },
  { tableName: "nades" }
);

const TargetType = sequelize.define<ITargetTypeModel>(
  "target_type",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    icon: { type: DataTypes.STRING, unique: true, allowNull: false },
  },
  { tableName: "target_types" }
);

const NadeImg = sequelize.define<INadeImgModel>(
  "nade_img",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    path: { type: DataTypes.STRING, allowNull: false },
  },
  { tableName: "nade_imgs" }
);

const Target = sequelize.define<ITargetModel>(
  "target",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    coordinateX: { type: DataTypes.INTEGER, allowNull: false },
    coordinateY: { type: DataTypes.INTEGER, allowNull: false },
  },
  { tableName: "targets" }
);

const NadeTarget = sequelize.define<INadeTargetModel>(
  "nade_target",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  },
  { tableName: "nade_targets" }
);

Map.hasMany(Nade);
Nade.belongsTo(Map);

Map.hasMany(Target);
Target.belongsTo(Map);

TargetType.hasMany(Target);
Target.belongsTo(TargetType);

Nade.hasMany(NadeImg);
NadeImg.belongsTo(Nade);

Nade.belongsToMany(Target, { through: NadeTarget });
Target.belongsToMany(Nade, { through: NadeTarget });

TargetType.bulkCreate(
  [
    {
      id: 1 as CreateOptions<number>,
      name: "smoke",
      icon: "src/static/smokeIcon.svg",
    },
    {
      id: 2 as CreateOptions<number>,
      name: "flash",
      icon: "src/static/flashIcon.svg",
    },
    {
      id: 3 as CreateOptions<number>,
      name: "hae",
      icon: "src/static/haeIcon.svg",
    },
    {
      id: 4 as CreateOptions<number>,
      name: "molotov",
      icon: "src/static/molotovIcon.svg",
    },
  ],
  { ignoreDuplicates: true }
);

export { Map, Nade, TargetType, NadeImg, NadeTarget, Target };
