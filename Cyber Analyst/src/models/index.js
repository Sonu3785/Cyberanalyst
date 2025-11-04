const { Sequelize } = require('sequelize');
const config = require('../config');


const sequelize = new Sequelize({
dialect: config.db.dialect,
storage: config.db.storage,
logging: false
});


const User = require('./user')(sequelize);


async function sync(force = false) {
await sequelize.sync({ force });
}


module.exports = { sequelize, User, sync };