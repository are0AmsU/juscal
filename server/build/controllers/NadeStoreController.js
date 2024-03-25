import { NadeType, TargetType } from "../models/index.js";
class NadeStoreController {
    async getNadeStore(req, res) {
        try {
            const nadeStore = { nadeTypes: {}, targetTypes: {}, targetIcons: {} };
            await Promise.all([
                NadeType.findAll({ attributes: ['id', 'name'] }).then(data => {
                    data.forEach(element => {
                        const typeName = element.dataValues.name;
                        nadeStore.nadeTypes[typeName] = element.dataValues;
                    });
                }),
                TargetType.findAll({ attributes: ['id', 'name'] }).then(data => {
                    data.forEach(element => {
                        const typeName = element.dataValues.name;
                        nadeStore.targetTypes[typeName] = element.dataValues;
                    });
                })
            ]).then(data => {
                res.json(nadeStore);
            });
        }
        catch (error) {
            console.log(error);
        }
    }
}
export default new NadeStoreController();
//# sourceMappingURL=NadeStoreController.js.map