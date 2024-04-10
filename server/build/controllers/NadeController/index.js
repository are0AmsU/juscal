import { Nade, Target, NadeType, TargetType, NadeTarget, } from "./../../models/index.js";
class NadeController {
    async create(req, res) {
        try {
            console.log(req.params, req.body);
            const { mapId } = req.params;
            const { nade, fromNadeTarget, toNadeTarget } = req.body;
            const nadeType = await NadeType.findOne({
                where: { name: toNadeTarget.nadeType },
            }).then((data) => data === null || data === void 0 ? void 0 : data.dataValues);
            const targetTypes = await TargetType.findAll().then((types) => types.map((type) => type.dataValues));
            const dataNade = await Nade.create({
                name: nade.name,
                description: nade.description,
                mapId: mapId,
                nadeTypeId: nadeType === null || nadeType === void 0 ? void 0 : nadeType.id,
            }).then((data) => data.dataValues);
            const [clientFromNadeTarget, clientToNadeTarget] = await Promise.all([fromNadeTarget, toNadeTarget].map(async (trg) => {
                return new Promise((resolve, reject) => {
                    var _a;
                    Target.create({
                        coordinateX: trg.coordinates[0],
                        coordinateY: trg.coordinates[1],
                        targetTypeId: (_a = targetTypes.find((targetType) => targetType.name === trg.type)) === null || _a === void 0 ? void 0 : _a.id,
                    })
                        .then((data) => data.dataValues)
                        .then((target) => {
                        NadeTarget.create({
                            nadeId: dataNade.id,
                            targetId: target.id,
                        });
                        trg.nadeIds.push(dataNade.id);
                        resolve({ ...trg, id: target.id });
                    });
                });
            }));
            const clientNade = {
                ...nade,
                id: dataNade.id,
                fromTargetId: clientFromNadeTarget.id,
                toTargetId: clientToNadeTarget.id,
            };
            res.json({ clientNade, clientFromNadeTarget, clientToNadeTarget });
        }
        catch (error) {
            console.log(error);
        }
    }
}
export default new NadeController();
//# sourceMappingURL=index.js.map