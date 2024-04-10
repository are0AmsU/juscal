import express from "express";
import router from "./router/index.js";
import sequelize from "./db.js";
import * as path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
const PORT = 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);
app.use("/src/static", express.static(path.dirname(fileURLToPath(import.meta.url)) + "/static"));
const start = async () => {
    try {
        await sequelize.authenticate();
        // await sequelize.sync({ force: true });
        app.listen(PORT, () => console.log("start server on port: " + PORT));
    }
    catch (error) {
        console.log(error);
    }
};
start();
//# sourceMappingURL=index.js.map