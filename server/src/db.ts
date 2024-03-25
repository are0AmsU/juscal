import { Sequelize } from "sequelize";
import dotenv from 'dotenv'

dotenv.config()

export default new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USERNAME!,
  '',
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: Number(process.env.DB_PORT)
  }
)