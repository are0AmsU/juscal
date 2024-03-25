import { Nade, Target, NadeType, NadeImg, TargetType, NadeTarget } from "../models/index.js";
class NadeController {
    async create(req, res) {
        try {
            const { mapId } = req.params;
            let { name, description, targets } = req.body;
            const { screenshots } = req.files;
            targets = JSON.parse(targets);
            const nadeTypes = await NadeType.findAll();
            const currentNadeType = targets.find(target => target.nadeType).nadeType;
            const nadeTypeId = nadeTypes.find(nadeType => nadeType.dataValues.name === currentNadeType).dataValues.id;
            const targetTypes = await TargetType.findAll();
            const nade = await Nade.create({ name, description, mapId, nadeTypeId });
            screenshots.forEach(screen => {
                NadeImg.create({ path: screen.path, nadeId: nade.dataValues.id });
            });
            targets.forEach(async (trg) => {
                const target = await Target.create({ coordinateX: trg.coordinates[0], coordinateY: trg.coordinates[1], targetTypeId: targetTypes.find(targetType => targetType.name === trg.type).id });
                await NadeTarget.create({ nadeId: nade.dataValues.id, targetId: target.dataValues.id });
            });
        }
        catch (error) {
            console.log(error);
        }
    }
}
export default new NadeController();
//# sourceMappingURL=NadeController.js.map