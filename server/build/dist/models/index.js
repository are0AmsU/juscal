import sequelize from './../db.js';
import { DataTypes } from 'sequelize';
export const Map = sequelize.define('map', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    img: { type: DataTypes.STRING, unique: true, allowNull: false },
    previewImg: { type: DataTypes.STRING, unique: true, allowNull: false }
});
export const Nade = sequelize.define('nade', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
});
export const NadeType = sequelize.define('nade_type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
});
export const Target = sequelize.define('target', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    coordinateX: { type: DataTypes.INTEGER, unique: true, allowNull: false },
    coordinateY: { type: DataTypes.INTEGER, unique: true, allowNull: false }
});
export const TargetType = sequelize.define('target_type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
});
export const NadeTarget = sequelize.define('nade_target', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});
export const TargetIcon = sequelize.define('target_icon', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});
export const TargetIconImg = sequelize.define('target_icon_img', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    path: { type: DataTypes.STRING, unique: true, allowNull: false }
});
Map.hasMany(Nade);
Nade.belongsTo(Map);
NadeType.hasMany(Nade);
Nade.belongsTo(NadeType);
Nade.hasMany(NadeTarget);
NadeTarget.belongsTo(Nade);
Target.hasMany(NadeTarget);
NadeTarget.belongsTo(Target);
TargetType.hasMany(Target);
Target.belongsTo(TargetType);
Target.hasOne(TargetIcon);
TargetIcon.belongsTo(Target);
TargetIconImg.hasMany(TargetIcon);
TargetIcon.belongsTo(TargetIconImg);
export const models = {
    Map,
    Nade,
    NadeType,
    NadeTarget,
    Target,
    TargetType,
    TargetIcon,
    TargetIconImg
};
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map