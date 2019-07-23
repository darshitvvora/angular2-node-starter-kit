module.exports = DataTypes => ({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: DataTypes.STRING,
  info: DataTypes.STRING,
  active: DataTypes.BOOLEAN,
  created_by: DataTypes.INTEGER,
});
