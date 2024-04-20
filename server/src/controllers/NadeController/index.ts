import {
  Nade,
  Target,
  TargetType,
  NadeImg,
  NadeTarget,
} from "./../../models/index.js";
import { Response, response } from "express";
import { INadeClient, ITargetClient } from "../../types/index.js";
import { INadeCreateRequest, INadeDeleteByIdRequest } from "./types.js";
import { CreateOptions, ForeignKey } from "sequelize";

class NadeController {
  async create(req: INadeCreateRequest, res: Response) {
    try {
      const { mapId } = req.params;
      const { nade } = req.body;
      const dataNade = await Nade.create({
        name: nade.name || null,
        description: nade.description || null,
        mapId: mapId,
      }).then((data) => data.dataValues);
      const clientNade: INadeClient = {
        ...nade,
        id: dataNade.id!,
      };
      res.json(clientNade);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(req: INadeDeleteByIdRequest, res: Response) {
    try {
      const { nadeId } = req.params;
      await Nade.destroy({ where: { id: nadeId } });
      res.json(200);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new NadeController();
