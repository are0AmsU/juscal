class NadeController {
  create(req, res) {
    try {
      console.log(req.body, req.files)
    } catch (error) {
      console.log(error)
    }
  }
}

export default new NadeController()