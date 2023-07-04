import { sequelize } from '../utils/db.instance';

export default defineNitroPlugin(async (nitro) => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); //automatically create tables
    console.log('DB connected');
  } catch (error) {
    console.log(error);
  }
});
