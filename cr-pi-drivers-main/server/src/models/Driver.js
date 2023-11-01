const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Driver', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'The name is required',
        }
      },
    },
    lastname: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'The lastname is required',
        }
      },
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'The description is required',
        }
      },
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "https://img.freepik.com/vector-premium/coche-corredor-dibujos-animados_74102-1526.jpg",
      validate: {
        isUrl: {
          msg: 'Must be an URL',
        }
      }
    },
    nacionality: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'The nacionality is required',
        }
      },
    },
      birthdate: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'The birthdate is required',
        }
      },
    }
  },{freezeTableName: true, timestamps:false})
};