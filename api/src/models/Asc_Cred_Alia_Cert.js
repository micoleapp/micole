const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Asc_Cred_Alia_Cert',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: 'El campo nombre no puede estar vacío',
          },
          len: {
            args: [1, 150],
            msg: 'El campo nombre debe tener entre 1 y 100 caracteres',
          },
        },
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: 'El campo slug no puede estar vacío',
          },
        },
      },
      agrupaciones: {
        type: DataTypes.STRING,
      },
      logo: {
        type: DataTypes.STRING,
        validate: {
          isUrl: {
            msg: 'El campo logo debe ser una URL válida de una imagen',
          },
        },
      },
    },
    {
      timestamps: false,
    }
  );
};
