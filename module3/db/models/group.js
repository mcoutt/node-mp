'use strict';

module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    permissions: {
      type: DataTypes.ARRAY(DataTypes.ENUM([
        'READ',
        'WRITE',
        'DELETE',
        'SHARE',
        'UPLOAD_FILES'
      ])
      ),
      allowNull: true
    }

  }, {
    timestamps: true
  });
  Group.associate = function(models) {
    Group.belongsToMany(models.User, {
      through: 'UserGroup',
      as: 'users',
      foreignKey: 'group_id',
    });
  };
  return Group;
};


