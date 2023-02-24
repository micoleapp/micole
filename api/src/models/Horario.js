const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Horario',
    {
      Lunes: [
        {
          inicio: { type: DataTypes.STRING, required: true },
          fin: { type: DataTypes.STRING, required: true },
        },
      ],
      Martes: [
        {
          inicio: { type: DataTypes.STRING, required: true },
          fin: { type: DataTypes.STRING, required: true },
        },
      ],
      Miercoles: [
        {
          inicio: { type: DataTypes.STRING, required: true },
          fin: { type: DataTypes.STRING, required: true },
        },
      ],
      Jueves: [
        {
          inicio: { type: DataTypes.STRING, required: true },
          fin: { type: DataTypes.STRING, required: true },
        },
      ],
      Viernes: [
        {
          inicio: { type: DataTypes.STRING, required: true },
          fin: { type: DataTypes.STRING, required: true },
        },
      ],
      Sabado: [
        {
          inicio: { type: DataTypes.STRING, required: true },
          fin: { type: DataTypes.STRING, required: true },
        },
      ],
    },
    {
      timestamps: false,
    }
  );
};