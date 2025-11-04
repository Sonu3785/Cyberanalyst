require('dotenv').config();


module.exports = {
port: process.env.PORT || 4000,
jwtSecret: process.env.JWT_SECRET || 'dev_secret_change_me',
db: {
storage: process.env.DATABASE_STORAGE || './data/database.sqlite',
dialect: 'sqlite'
}
};