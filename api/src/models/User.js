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
          is: {
            args: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
            msg: 'El nombre solo puede contener letras, acentos, tildes y espacios',
          },
          len: {
            args: [3, 60],
            msg: 'El nombre debe tener entre 3 y 60 letras',
          },
        },
      },
      apellidos: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
            msg: 'El apellido solo puede contener letras, acentos, tildes y espacios',
          },
          len: {
            args: [6, 60],
            msg: 'El apellido debe tener entre 6 y 60 letras',
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