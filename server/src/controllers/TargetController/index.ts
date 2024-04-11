import { Response } from "express";
import { ITargetCreateRequest, ITargetDeleteByIdRequest } from "./types.js";
import { TargetType, Target } from "../../models/index.js";
import { CreateOptions } from "sequelize";
import { ITargetClient } from "../../types/index.js";

class TargetController {
  async create(req: ITargetCreateRequest, res: Response) {
    try {
      const { mapId } = req.params;
      const { target } = req.body;
      const fromTargetIconPath = await TargetType.findOne({
        where: { name: target.type },
      }).then((data) => data?.dataValues.icon);
      const clientTarget: ITargetClient = await Target.create({
        coordinateX: target.coordinates[0],
        coordinateY: target.coordinates[1],
        mapId,
      })
        .then((data) => data.dataValues)
        .then(
          (data): ITargetClient => ({
            ...target,
            id: data.id as CreateOptions<number>,
            icon: fromTargetIconPath || null,
          })
        );
      res.json(clientTarget);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(req: ITargetDeleteByIdRequest, res: Response) {
    try {
      const { targetId } = req.params;
      await Target.destroy({ where: { id: targetId } });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new TargetController();
