const User = (sequelize, DataTypes) => {
  const Employee = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING
  },
  {
    timestamps: false,
    tableName: 'Users'
  });

  return Employee;
};

module.exports = User;