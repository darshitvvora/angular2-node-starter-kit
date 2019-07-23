const {
  engine, timestamps, properties,
} = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('session', Object
      .assign(properties('session', DataTypes), timestamps(1, DataTypes)), engine);
  },
  down(queryInterface) {
    return queryInterface.dropTable('session');
  },
};
