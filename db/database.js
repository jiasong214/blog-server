import SQ from 'sequelize';
import { config } from '../config.js';

const { host,  user, database, password } = config.db;

export const sequelize = new SQ.Sequelize(database, user, password, {
  host,
  // port,
  // dialect: 'postgres',
  // logging: false,
  // dialectOptions: {
  //   ssl: {
  //     require: true,
  //     rejectUnauthorized: false,
  //   }
  // }
  dialect: 'mysql',
});
