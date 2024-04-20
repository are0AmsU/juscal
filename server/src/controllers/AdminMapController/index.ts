import { Response } from "express";
import {
  Map,
  Nade,
  TargetType,
  Target,
  NadeImg,
  NadeTarget,
} from "../../models/index.js";
import {
  IAdminMapCreateNadeAndTargetRequest,
  IAdminMapGetNadeAndTargetRequestByMapId,
} from "./types.js";
import { CreateOptions } from "sequelize";
import { INadeClient, ITargetClient, IMapClient } from "../../types/index.js";

class AdminMapController {
  async getMapAndNadeAndTargetsByMapId(
    req: IAdminMapGetNadeAndTargetRequestByMapId,
    res: Response
  ) {
    try {
      const { mapId } = req.params;
      const map: IMapClient = await Map.findOne({ where: { id: mapId } })
        .then((map) => map?.dataValues)
        .then((dataMap) => ({
          id: dataMap?.id!,
          name: dataMap?.name!,
          img: dataMap?.img!,
          preview: dataMap?.preview!,
        }));
      const nades: INadeClient[] = (await Nade.findAll({ where: { mapId } }))
        .map((nade) => nade.dataValues)
        .map((nade) => ({
          id: nade.id!,
          name: nade.name,
          description: nade.description,
          targetsIds: [],
          photoPaths: [],
          isSelected: false,
        }));
      const targets: ITargetClient[] = (
        await Target.findAll({
          where: { mapId },
        })
      )
        .map((target) => target.dataValues)
        .map((target) => ({
          id: target.id!,
          icon: null,
          type: target.target_type?.name || null,
          coordinates: [target.coordinateX, target.coordinateY],
          isSelected: false,
          isNadeTarget: false,
          nadeIds: [],
        }));
      res.json({ map, nades, targets });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new AdminMapController();
