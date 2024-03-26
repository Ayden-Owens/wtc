module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        profilePicture: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        budget: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        }
    });
    
    return Users;
};
