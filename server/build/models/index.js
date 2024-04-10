import sequelize from "../db.js";
import { DataTypes, } from "sequelize";
// class Map extends Model<
//   InferAttributes<IMapModel>,
//   InferCreationAttributes<IMapModel>
// > {}
// class Nade extends Model<
//   InferAttributes<INadeModel>,
//   InferCreationAttributes<INadeModel>
// > {}
// class NadeType extends Model<
//   InferAttributes<INadeTypeModel>,
//   InferCreationAttributes<INadeTypeModel>
// > {}
// class NadeImg extends Model<
//   InferAttributes<INadeImgModel>,
//   InferCreationAttributes<INadeImgModel>
// > {}
// class Target extends Model<
//   InferAttributes<ITargetModel>,
//   InferCreationAttributes<ITargetModel>
// > {}
// class TargetType extends Model<
//   InferAttributes<ITargetTypeModel>,
//   InferCreationAttributes<ITargetTypeModel>
// > {}
// class NadeTarget extends Model<
//   InferAttributes<INadeTargetModel>,
//   InferCreationAttributes<INadeTargetModel>
// > {}
const Map = sequelize.define("map", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    img: { type: DataTypes.STRING, unique: true, allowNull: false },
    preview: { type: DataTypes.STRING, unique: true, allowNull: false },
}, { tableName: "maps" });
const Nade = sequelize.define("nade", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
}, { tableName: "nades" });
const NadeType = sequelize.define("nade_type", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
}, { tableName: "nade_types" });
const NadeImg = sequelize.define("nade_img", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    path: { type: DataTypes.STRING, allowNull: false },
}, { tableName: "nade_imgs" });
const Target = sequelize.define("target", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    coordinateX: { type: DataTypes.INTEGER, allowNull: false },
    coordinateY: { type: DataTypes.INTEGER, allowNull: false },
}, { tableName: "targets" });
const TargetType = sequelize.define("targets_type", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
}, { tableName: "target_types" });
const NadeTarget = sequelize.define("nade_target", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
}, { tableName: "nade_targets" });
Map.hasMany(Nade);
Nade.belongsTo(Map);
Map.hasMany(Target);
Target.belongsTo(Map);
NadeType.hasMany(Nade);
Nade.belongsTo(NadeType);
Nade.hasMany(NadeImg);
NadeImg.belongsTo(Nade);
TargetType.hasMany(Target);
Target.belongsTo(TargetType);
Nade.belongsToMany(Target, { through: NadeTarget });
Target.belongsToMany(Nade, { through: NadeTarget });
NadeType.bulkCreate([
    { id: 1, name: "smoke" },
    { id: 2, name: "flash" },
    { id: 3, name: "hae" },
    { id: 4, name: "molotov" },
], { ignoreDuplicates: true });
TargetType.bulkCreate([
    { id: 1, name: "from" },
    { id: 2, name: "to" },
], { ignoreDuplicates: true });
export { Map, Nade, NadeType, NadeImg, NadeTarget, Target, TargetType };
//# sourceMappingURL=index.js.map