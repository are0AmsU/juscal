import { Response } from 'express';
import { Map, Nade, NadeType, TargetType, Target, NadeImg, NadeTarget } from "../../models/index.js"
import { IAdminMapCreateNadeAndTargetRequest, IAdminMapGetNadeAndTargetRequestByMapId } from './types.js';
import { CreateOptions } from 'sequelize';
import { INade, ITarget, INadeClient, ITargetClient } from '../../types/index.js';

class AdminMapController {

  async createNadeAndTargets(req: IAdminMapCreateNadeAndTargetRequest, res: Response) {
    try {
      const { mapId } = req.params
      let { nade, targets } = req.body
      const { screenshots } = req.files
      nade = JSON.parse(nade as string) as INadeClient
      targets = JSON.parse(targets as string) as ITargetClient[]
      const targetNadeType = targets.find(target => target.nadeType)?.nadeType
      const nadeTypeId = await NadeType.findOne({ where: { name: targetNadeType! } }).then(data => data?.dataValues.id)
      const targetTypes = (await TargetType.findAll()).map(type => type.dataValues)
      const dataNade = await Nade.create({ name: nade.name, description: nade.description, mapId: mapId as CreateOptions<number>, nadeTypeId }).then(data => data.dataValues as INade)
      screenshots.forEach(screen => {
        NadeImg.create({ path: screen.path, nadeId: dataNade.id })
      })
      targets.forEach(async trg => {
        const target = await Target.create({ coordinateX: trg.coordinates[0], coordinateY: trg.coordinates[1], targetTypeId: targetTypes.find(targetType => targetType.name === trg.type)?.id }).then(data => data.dataValues as ITarget)
        await NadeTarget.create({ nadeId: dataNade.id, targetId: target.id })
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getMapAndNadeAndTargetsByMapId(req: IAdminMapGetNadeAndTargetRequestByMapId, res: Response) {
    try {
      const { mapId } = req.params
      const map = await Map.findOne({ where: { id: mapId } }).then(map => map?.dataValues)
      const nades = (await Nade.findAll({ where: { mapId } })).map(nade => nade.dataValues)
      const targets = (await Target.findAll({ where: { mapId } })).map(target => target.dataValues)
      res.json({ map, nades: nades as INadeClient[], targets: targets })
    } catch (error) {
      console.log(error)
    }
  }

}

export default new AdminMapController()