import { NadeType } from "../models/index.js";
class NadeTypeController {
    async getAll(req, res) {
        try {
            const nadeTypes = await NadeType.findAll();
            res.json(nadeTypes);
        }
        catch (error) {
            console.log(error);
        }
    }
}
export default new NadeTypeController();
//# sourceMappingURL=NadeTypeController.js.map