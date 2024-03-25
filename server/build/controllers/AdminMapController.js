import { Map, Nade, NadeType, TargetType, Target } from "../models/index.js";
class AdminMapController {
    async createNadeAndTargets(req, res) {
        try {
            const { mapId } = req.params;
            let { nade, targets } = req.body;
            const { screenshots } = req.files;
            nade = JSON.parse(nade);
            targets = JSON.parse(targets);
            const nadeTypes = await NadeType.findAll();
            const currentNadeType = targets.find(target => target.nadeType).nadeType;
            const nadeTypeId = nadeTypes.find(nadeType => nadeType.dataValues.name === currentNadeType).dataValues.id;
            const targetTypes = await TargetType.findAll();
            const dataNade = await Nade.create({ name: nade.name, description: nade.description, mapId, nadeTypeId });
            screenshots.forEach(screen => {
                NadeImg.create({ path: screen.path, nadeId: dataNade.dataValues.id });
            });
            targets.forEach(async (trg) => {
                const target = await Target.create({ coordinateX: trg.coordinates[0], coordinateY: trg.coordinates[1], targetTypeId: targetTypes.find(targetType => targetType.name === trg.type).id });
                await NadeTarget.create({ nadeId: dataNade.dataValues.id, targetId: target.dataValues.id });
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async getMapAndNadeAndTargetsByMapId(req, res) {
        try {
            const { mapId } = req.params;
            const map = await Map.findOne({ where: { id: mapId } });
            const nades = await Nade.findAll({ where: { mapId } });
            res.json({ map, nades, targets: [] });
        }
        catch (error) {
            console.log(error);
        }
    }
}
export default new AdminMapController();
//# sourceMappingURL=AdminMapController.js.map