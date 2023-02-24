const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Disponibilidad',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      Lunes: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
      },
      Martes: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
      },
      Miercoles: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
      },
      Jueves: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
      },
      Viernes: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
      },
      Sabado: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
