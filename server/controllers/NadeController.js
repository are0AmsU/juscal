class NadeController {
  create(req, res) {
    try {
      const { name, description, targets = JSON.parse(targets) } = req.body
      const { screenshots } = req.files
      console.log(targets)
    } catch (error) {
      console.log(error)
    }
  }
}

export default new NadeController()