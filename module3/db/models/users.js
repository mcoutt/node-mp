'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },

    login: DataTypes.STRING,
    password: DataTypes.STRING,
    age: DataTypes.INTEGER,
    isDeleted: DataTypes.BOOLEAN
  }, {
    timestamps: true
  });
  User.associate = function(models) {
    User.belongsToMany(models.Group, {
      through: 'UserGroup',
      as: 'groups',
      foreignKey: 'user_id',
    })
  };
  return User;
};