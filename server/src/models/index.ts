import sequelize from "../db.js";
import { CreateOptions, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { IMapModel, INadeImgModel, INadeModel, INadeTargetModel, INadeTypeModel, ITargetModel, ITargetTypeModel } from "../types/index.js";

class Map extends Model<InferAttributes<IMapModel>, InferCreationAttributes<IMapModel>> {}
class Nade extends Model<InferAttributes<INadeModel>, InferCreationAttributes<INadeModel>> {}
class NadeType extends Model<InferAttributes<INadeTypeModel>, InferCreationAttributes<INadeTypeModel>> {}
class NadeImg extends Model<InferAttributes<INadeImgModel>, InferCreationAttributes<INadeImgModel>> {}
class Target extends Model<InferAttributes<ITargetModel>, InferCreationAttributes<ITargetModel>> {}
class TargetType extends Model<InferAttributes<ITargetTypeModel>, InferCreationAttributes<ITargetTypeModel>> {}
class NadeTarget extends Model<InferAttributes<INadeTargetModel>, InferCreationAttributes<INadeTargetModel>> {}

Map.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  img: { type: DataTypes.STRING, unique: true, allowNull: false },
  preview: { type: DataTypes.STRING, unique: true, allowNull: false },
}, { sequelize, tableName: 'maps' })

Nade.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
}, { sequelize, tableName: 'nades' });

NadeType.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
}, { sequelize, tableName: 'nade_types' });

NadeImg.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  path: { type: DataTypes.STRING, allowNull: false },
}, { sequelize, tableName: 'nade_imgs' });

Target.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  coordinateX: { type: DataTypes.INTEGER, allowNull: false },
  coordinateY: { type: DataTypes.INTEGER, allowNull: false },
}, { sequelize, tableName: 'targets' });

TargetType.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
}, { sequelize, tableName: 'target_types' });

NadeTarget.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
}, { sequelize, tableName: 'nade_targets' });

Map.hasMany(Nade);
Nade.belongsTo(Map);

Map.hasMany(Target)
Target.belongsTo(Map)

NadeType.hasMany(Nade);
Nade.belongsTo(NadeType);

Nade.hasMany(NadeImg);
NadeImg.belongsTo(Nade);

Nade.hasMany(NadeTarget);
NadeTarget.belongsTo(Nade);

Target.hasMany(NadeTarget);
NadeTarget.belongsTo(Target);

TargetType.hasMany(Target);
Target.belongsTo(TargetType);

NadeType.bulkCreate(
  [
    { id: 1 as CreateOptions<number>, name: "smoke" },
    { id: 2 as CreateOptions<number>, name: "flash" },
    { id: 3 as CreateOptions<number>, name: "hae" },
    { id: 4 as CreateOptions<number>, name: "molotov" }
  ],
  { ignoreDuplicates: true }
);

TargetType.bulkCreate(
  [
    { id: 1 as CreateOptions<number>, name: "from" },
    { id: 2 as CreateOptions<number>, name: "to" },
  ],
  { ignoreDuplicates: true }
);

export {
  Map,
  Nade,
  NadeType,
  NadeImg,
  NadeTarget,
  Target,
  TargetType,
};
