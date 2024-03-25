import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();
export default new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, null, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: Number(process.env.DB_PORT)
});
//# sourceMappingURL=db.js.map
//# sourceMappingURL=db.js.map