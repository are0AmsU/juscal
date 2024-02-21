import { NadeType, TargetIconImg, TargetType } from "../models/index.js"

class NadeStoreController {
  async getNadeStore(req, res) {
    try {
      const nadeStore = { nadeTypes: {}, targetTypes: {}, targetIcons: {} }
      await Promise.all([
        NadeType.findAll({ attributes: ['name'] }).then(data => {
          data.forEach(element => {
            const key = element.dataValues.name
            console.log(key)
            nadeStore.nadeTypes[key] = key
          })
        }),
        TargetType.findAll({ attributes: ['name'] }).then(data => {
          data.forEach(element => {
            const key = element.dataValues.name
            nadeStore.targetTypes[key] = key
          })
        }),
        TargetIconImg.findAll({ attributes: ['path'], include: [{ model: NadeType, attributes: ['name'] }] }).then(data => {
          data.forEach(element => {
            const key = element.dataValues.nade_type.name
            nadeStore.targetIcons[key] = element.dataValues.path
          })
        })
      ]).then(data => {
        console.log(nadeStore)
        res.json(nadeStore)
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export default new NadeStoreController()