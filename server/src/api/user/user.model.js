const properties = require('./user.property');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', Object.assign(properties(DataTypes)), {
    tableName: 'users',
    timestamps: false,
    underscored: true,
    paranoid: true,
  });

  return User;
};

