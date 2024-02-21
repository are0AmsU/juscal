import { NadeType } from "../models/index.js"

class NadeController {
  async create(req, res) {
    try {
      const { name, description, targets = JSON.parse(targets) } = req.body
      const { screenshots } = req.files
      console.log(targets)
    } catch (error) {
      console.log(error)
    }
  }

  async getNadeTypes(req, res) {
    try {
      const types = await NadeType.findAll()
      res.json(types)
    } catch (error) {
      console.log(error)
    }
  }
}

export default new NadeController()