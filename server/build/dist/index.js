var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import router from "./router/index.js";
import sequelize from "./db.js";
const PORT = 5000;
const app = express();
app.use(router);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        yield sequelize.sync();
        console.log(sequelize.models);
        app.listen(PORT, () => {
            console.log('start server on port: ' + PORT);
        });
    }
    catch (error) {
        console.log(error);
    }
});
start();
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map