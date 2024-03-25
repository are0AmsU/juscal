import { Nade, Target, NadeType, NadeImg, TargetType, NadeTarget } from "./../../models/index.js"
import { Response } from "express"
import { INadeType, ITarget, ITargetClient, ITargetType } from "../../types/index.js"
import { INadeCreateRequest } from "./types.js"
import { CreateOptions } from "sequelize"

class NadeController {
  async create(req: INadeCreateRequest, res: Response) {
    try {
      const { mapId } = req.params
      let { name, description, targets } = req.body
      const { screenshots } = req.files
      targets = JSON.parse(targets as string) as ITargetClient[]
      const targetNadeType = targets.find(target => target.nadeType)?.nadeType
      const nadeTypeId = await NadeType.findOne({ where: { name: targetNadeType! } }).then(data => data?.dataValues.id)
      const targetTypes = await TargetType.findAll().then(types => types.map(type => type.dataValues))
      const nade = await Nade.create({ name, description, mapId: mapId as CreateOptions<number>, nadeTypeId }).then(data => data.dataValues)
      screenshots.forEach(screen => {
        NadeImg.create({ path: screen.path, nadeId: nade.id })
      })
      targets.forEach(async trg => {
        const target = await Target.create({ coordinateX: trg.coordinates[0], coordinateY: trg.coordinates[1], targetTypeId: targetTypes.find(targetType => targetType.name === trg.type)?.id }).then(data => data.dataValues)
        await NadeTarget.create({ nadeId: nade.id, targetId: target.id })
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export default new NadeController()