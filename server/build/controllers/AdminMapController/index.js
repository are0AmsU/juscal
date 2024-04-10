import { Map, Nade, NadeType, TargetType, Target, NadeImg, NadeTarget, } from "../../models/index.js";
class AdminMapController {
    async createNadeAndTargets(req, res) {
        var _a;
        try {
            const { mapId } = req.params;
            let { nade, targets } = req.body;
            const { screenshots } = req.files;
            nade = JSON.parse(nade);
            targets = JSON.parse(targets);
            const targetNadeType = (_a = targets.find((target) => target.nadeType)) === null || _a === void 0 ? void 0 : _a.nadeType;
            const nadeTypeId = await NadeType.findOne({
                where: { name: targetNadeType },
            }).then((data) => data === null || data === void 0 ? void 0 : data.dataValues.id);
            const targetTypes = (await TargetType.findAll()).map((type) => type.dataValues);
            const dataNade = await Nade.create({
                name: nade.name,
                description: nade.description,
                mapId: mapId,
                nadeTypeId: nadeTypeId,
            }).then((data) => data.dataValues);
            screenshots.forEach((screen) => {
                NadeImg.create({ path: screen.path, nadeId: dataNade.id });
            });
            targets.forEach(async (trg) => {
                var _a;
                const target = await Target.create({
                    coordinateX: trg.coordinates[0],
                    coordinateY: trg.coordinates[1],
                    targetTypeId: (_a = targetTypes.find((targetType) => targetType.name === trg.type)) === null || _a === void 0 ? void 0 : _a.id,
                }).then((data) => data.dataValues);
                await NadeTarget.create({
                    nadeId: dataNade.id,
                    targetId: target.id,
                });
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async getMapAndNadeAndTargetsByMapId(req, res) {
        try {
            const { mapId } = req.params;
            const map = await Map.findOne({ where: { id: mapId } })
                .then((map) => map === null || map === void 0 ? void 0 : map.dataValues)
                .then((dataMap) => ({
                id: dataMap === null || dataMap === void 0 ? void 0 : dataMap.id,
                name: dataMap === null || dataMap === void 0 ? void 0 : dataMap.name,
                img: dataMap === null || dataMap === void 0 ? void 0 : dataMap.img,
                preview: dataMap === null || dataMap === void 0 ? void 0 : dataMap.preview,
            }));
            const nades = (await Nade.findAll({ where: { mapId } })).map((nade) => nade.dataValues);
            const targets = (await Target.findAll({ where: { mapId } })).map((target) => target.dataValues);
            res.json({ map, nades, targets });
        }
        catch (error) {
            console.log(error);
        }
    }
}
export default new AdminMapController();
//# sourceMappingURL=index.js.map