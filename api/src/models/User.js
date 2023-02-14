const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            args: true,
            msg: 'El nombre solo puede contener letras',
          },
          len: {
            args: [2, 50],
            msg: 'El nombre debe tener entre 2 y 50 letras',
          },
        },
      },
      apellidos: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            args: true,
            msg: 'Los apellidos solo pueden contener letras',
          },
          len: {
            args: [5, 50],
            msg: 'Los apellidos deben tener entre 2 y 50 letras',
          },
        },
      },
      dni: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: {
            args: [8, 8],
            msg: 'El DNI debe tener 8 caracteres',
          },
        },
      },
      telefono: {
        type: DataTypes.BIGINT,
        unique: true,
        validate: {
          isInt: {
            args: true,
            msg: 'El número telefónico solo debe contener números',
          },
        },
      },
      avatar: {
        type: DataTypes.STRING,
        defaultValue:
          'http://www.elblogdecha.org/wp-content/uploads/2021/06/perfil-vacio.jpg',
      },
    },
    {
      timestamps: false,
    }
  );
};