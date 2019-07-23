module.exports = DataTypes => ({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: false,
    primaryKey: true,
    allowNull: false,
    unique: true,
    comment: 'Id has to same as gloryque_accounts.users.id',
  },
  email: DataTypes.STRING,
  mobile: DataTypes.STRING,
  name: DataTypes.STRING,
  client_id: DataTypes.INTEGER,
  is_admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  created_by: DataTypes.INTEGER,
});
