import { ApiError } from "../errors/ApiError.js"
import { Map } from './../models/index.js'
import * as fs from 'fs'

class MapController {

  async create(req, res, next) {
    try {
      const { img, preview } = req.files
      const { name } = req.body
      if (!name || !img[0] || !preview[0]) {
        return next(ApiError.badRequest('Не все поля заполнены'))
      }
      const map = await Map.create({ name, img: img[0].path, preview: preview[0].path })
      res.json(map)
    } catch (error) {
      res.json(error)
    }
  }

  async getAll(req, res) {
    try {
      const maps = await Map.findAll()
      res.json(maps)
    } catch (error) {
      res.json(error)
    }
  }

  async getOneById(req, res) {
    try {
      const map = await Map.findByPk(req.params.id)
      res.json(map)
    } catch (error) {
      res.json(error)
    }
  }

  async updateOneById(req, res) {
    try {
      const newMap = req.body
      const updatedMap = await Map.update(newMap, { where: { id: newMap.id } })
      res.json(updatedMap)
    } catch (error) {
      res.json(error)
    }
  }

}

export default new MapController()