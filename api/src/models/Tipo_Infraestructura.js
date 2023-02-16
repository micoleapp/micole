const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Tipo_Infraestructura',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      nombre_tipo_infraestructura: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: 'El campo nombre_tipo_infraestructura no puede estar vacío',
          },
        },
      },
    },
    {
      timestamps: true,
    }
  );
};
