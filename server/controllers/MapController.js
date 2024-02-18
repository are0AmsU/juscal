import { ApiError } from "../errors/ApiError.js"
import { Map } from '../models/index.js'
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

  async getById(req, res) {
    try {
      const map = await Map.findByPk(req.params.id)
      res.json(map)
    } catch (error) {
      res.json(error)
    }
  }

  async updateById(req, res) {
    try {
      const { name } = req.body
      const { img, preview } = req.files
      const { id } = req.params.id
      const map = await Map.findOne({ where: { id } })
      if (img && map.dataValues.img !== img[0].path) {
        fs.unlink('./' + map.dataValues.img)
      }
      if (path && map.dataValues.path !== path[0].path) {
        fs.unlink('./' + map.dataValues.path)
      }
      const newData = { name, img: img[0].path, preview: preview[0].path }
      const updatedMap = await Map.update(newData, { where: { id } })
      res.json(updatedMap)
    } catch (error) {
      res.json(error)
    }
  }

  async deleteById(req, res) {
    try {
      const { id } = req.params
      const { img, preview } = await Map.findOne({ where: { id }, attributes: ['preview', 'img'] })
      fs.unlink('./' + img, (error) => {
        console.log(error)
      })
      fs.unlink('./' + preview, (error) => {
        console.log(error)
      })
      await Map.destroy({ where: { id } })
      res.json('map deleted')
    } catch (error) {
      res.json(error)
    }
  }

}

export default new MapController()