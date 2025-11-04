const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');


module.exports = (sequelize) => {
const User = sequelize.define('User', {
id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
name: { type: DataTypes.STRING, allowNull: false },
email: { type: DataTypes.STRING, allowNull: false, unique: true },
passwordHash: { type: DataTypes.STRING, allowNull: false }
}, {
tableName: 'users',
timestamps: true
});


User.prototype.verifyPassword = function (password) {
return bcrypt.compare(password, this.passwordHash);
};


User.beforeCreate(async (user) => {
const salt = await bcrypt.genSalt(10);
user.passwordHash = await bcrypt.hash(user.passwordHash, salt);
});


return User;
};