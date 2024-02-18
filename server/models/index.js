import sequelize from '../db.js'
import { DataTypes } from 'sequelize'

export const Map = sequelize.define('map', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  img: { type: DataTypes.STRING, unique: true, allowNull: false },
  preview: { type: DataTypes.STRING, unique: true, allowNull: false }
})

export const Nade = sequelize.define('nade', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
})

export const NadeType = sequelize.define('nade_type', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

export const NadeImg = sequelize.define('nade_img', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  path: { type: DataTypes.STRING, allowNull: false }
})

export const Target = sequelize.define('target', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  coordinateX: { type: DataTypes.INTEGER, unique: true, allowNull: false },
  coordinateY: { type: DataTypes.INTEGER, unique: true, allowNull: false }
})

export const TargetType = sequelize.define('target_type', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false }
})

export const NadeTarget = sequelize.define('nade_target', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

export const TargetIcon = sequelize.define('target_icon', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

export const TargetIconImg = sequelize.define('target_icon_img', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  path: { type: DataTypes.STRING, unique: true, allowNull: false }
})

Map.hasMany(Nade)
Nade.belongsTo(Map)

NadeType.hasMany(Nade)
Nade.belongsTo(NadeType)

Nade.hasMany(NadeImg)
NadeImg.belongsTo(Nade)

Nade.hasMany(NadeTarget)
NadeTarget.belongsTo(Nade)

Target.hasMany(NadeTarget)
NadeTarget.belongsTo(Target)

TargetType.hasMany(Target)
Target.belongsTo(TargetType)

Target.hasOne(TargetIcon)
TargetIcon.belongsTo(Target)

TargetIconImg.hasMany(TargetIcon)
TargetIcon.belongsTo(TargetIconImg)

NadeType.hasMany(TargetIconImg)
TargetIconImg.belongsTo(NadeType)

NadeType.bulkCreate([
  { id: 1, name: 'smoke' },
  { id: 2, name: 'flash' },
  { id: 3, name: 'hae' },
  { id: 4, name: 'molotov' }
], { ignoreDuplicates: true })

TargetType.bulkCreate([
  { id: 1, name: 'from' },
  { id: 2, name: 'to' }
], { ignoreDuplicates: true })

TargetIconImg.bulkCreate([
  { id: 1, path: 'static\\SmokeIcon.svg', nadeTypeId: 1 },
  { id: 2, path: 'static\\FlashIcon.svg', nadeTypeId: 2 },
  { id: 3, path: 'static\\HaeIcon.svg', nadeTypeId: 3 },
  { id: 4, path: 'static\\MolotovIcon.svg', nadeTypeId: 4 }
], { ignoreDuplicates: true })

export const models = {
  Map,
  Nade,
  NadeType,
  NadeImg,
  NadeTarget,
  Target,
  TargetType,
  TargetIcon,
  TargetIconImg
}