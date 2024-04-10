import {
  Nade,
  Target,
  NadeType,
  NadeImg,
  TargetType,
  NadeTarget,
} from "./../../models/index.js";
import { Response, response } from "express";
import { INadeClient, ITargetClient } from "../../types/index.js";
import { INadeCreateRequest } from "./types.js";
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
}

export default new NadeController();
