const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("Team",{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name:{
            type:DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                  msg: 'The name is required',
                }
              }
        }
    },{freezeTableName: true, timestamps:false})
}