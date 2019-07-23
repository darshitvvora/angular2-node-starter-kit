const properties = require('./session.property');

module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', Object.assign(properties(DataTypes)), {
    tableName: 'session',
    timestamps: true,
    underscored: true,
  });

  return Session;
};
