import { NextFunction, Response } from "express";
import { ApiError } from "./../../errors/ApiError.js";
import { Map } from "./../../models/index.js";
import * as fs from "fs";
import {
  IMapCreateRequest,
  IMapGetByIdRequest,
  IMapUpdateByIdRequest,
  IMapDeleteByIdRequest,
} from "./types.js";

class MapController {
  async create(req: IMapCreateRequest, res: Response, next: NextFunction) {
    try {
      const { img, preview } = req.files;
      const { name } = req.body;
      if (!name || !img[0] || !preview[0]) {
        return next(ApiError.badRequest("Не все поля заполнены"));
      }
      await Map.create({
        name,
        img: img[0].path,
        preview: preview[0].path,
        description: "",
      });
    } catch (error) {
      res.json(error);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const maps = await Map.findAll();
      res.json(maps);
    } catch (error) {
      res.json(error);
    }
  }

  async getById(req: IMapGetByIdRequest, res: Response) {
    try {
      const map = await Map.findByPk(req.params.id);
      res.json(map);
    } catch (error) {
      res.json(error);
    }
  }

  async updateById(req: IMapUpdateByIdRequest, res: Response) {
    try {
      const { name } = req.body;
      const { img, preview } = req.files;
      const { id } = req.params;
      const map = await Map.findOne({ where: { id } }).then(
        (data) => data?.dataValues
      );
      if (img && map?.img !== img[0].path) {
        fs.unlink(map?.img + "", (err) => {
          console.log(err);
        });
      }
      if (preview && map?.preview !== preview[0].path) {
        fs.unlink(map?.preview + "", (err) => {
          console.log(err);
        });
      }
      await Map.update(
        { name, img: img[0].path, preview: preview[0].path },
        { where: { id } }
      );
    } catch (error) {
      res.json(error);
    }
  }

  async deleteById(req: IMapDeleteByIdRequest, res: Response) {
    // try {
    //   const { id } = req.params;
    //   const { img, preview } = await Map.findOne({
    //     where: { id },
    //     attributes: ["preview", "img"],
    //   }).then(data => data?.dataValues);
    //   fs.unlink(img, (error) => {
    //     console.log(error);
    //   });
    //   fs.unlink(preview, (error) => {
    //     console.log(error);
    //   });
    //   await Map.destroy({ where: { id } });
    //   res.json("map deleted");
    // } catch (error) {
    //   res.json(error);
    // }
  }
}

export default new MapController();
