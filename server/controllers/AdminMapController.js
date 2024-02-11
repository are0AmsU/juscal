import { Map, Nade } from "../models/index.js"

class AdminMapController {

  async getMapAndNadeByMapName(req, res) {
    try {
      const { name } = req.params
      const map = await Map.findOne({ where: { name } })
      res.json({ map, nades: [] })
    } catch (error) {
      console.log(error)
    }
  }

}

export default new AdminMapController()