module.exports = (sequelize, DataTypes) => {
    const UserGroup = sequelize.define('UserGroup', {

        user_id: {
            type: DataTypes.UUID
        },

        group_id: {
            type: DataTypes.UUID
        },
    }, {});
    UserGroup.associate = function(models) {
        // associations can be defined here
    };
    return UserGroup;
};