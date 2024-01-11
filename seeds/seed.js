const sequelize = require('../config/connection');
const { User } = require('../models');

const newUserData = require('./user.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(newUserData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
