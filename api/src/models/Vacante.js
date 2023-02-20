const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Vacante',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      alumnos_matriculados: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El campo alumnos_matriculados no puede estar vacío',
          },
          isInt: {
            msg: 'El campo alumnos_matriculados debe ser un número entero',
          },
          min: {
            args: [0],
            msg: 'El campo alumnos_matriculados debe ser un número entero positivo',
          },
        },
      },
      cantidad_profesores: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El campo cantidad_profesores no puede estar vacío',
          },
          isInt: {
            msg: 'El campo cantidad_profesores debe ser un número entero',
          },
          min: {
            args: [0],
            msg: 'El campo cantidad_profesores debe ser un número entero positivo',
          },
        },
      },
      cuota_pension: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El campo cuota_pension no puede estar vacío',
          },
          isDecimal: {
            msg: 'El campo cuota_pension debe ser un número decimal',
          },
          min: {
            args: [0],
            msg: 'El campo cuota_pension debe ser un número decimal positivo',
          },
        },
      },
      cuota_ingreso: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El campo cuota_ingreso no puede estar vacío',
          },
          isDecimal: {
            msg: 'El campo cuota_pension debe ser un número decimal',
          },
          min: {
            args: [0],
            msg: 'El campo cuota_pension debe ser un número decimal positivo',
          },
        },
      },
      tamaño_grupo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El campo tamaño_grupo no puede estar vacío',
          },
          isNumeric: {
            msg: 'El tamaño_grupo debe ser un número',
          },
          isInt: {
            msg: 'El tamaño_grupo debe ser un número entero',
          },
          min: {
            args: 1,
            msg: 'El tamaño_grupo debe ser al menos 1',
          },
        },
      },
      cantidad_salones: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El campo cantidad_salones no puede estar vacío',
          },
          isNumeric: {
            msg: 'La cantidad_salones debe ser un número',
          },
          isInt: {
            msg: 'La cantidad_salones debe ser un número entero',
          },
          min: {
            args: 1,
            msg: 'La cantidad_salones debe ser al menos 1',
          },
        },
      },
      capacidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El campo capacidad no puede estar vacío',
          },
          isNumeric: {
            msg: 'La capacidad debe ser un número',
          },
          isInt: {
            msg: 'La capacidad debe ser un número entero',
          },
          min: {
            args: 1,
            msg: 'La capacidad debe ser al menos 1',
          },
        },
      },
    },
    {
      timestamps: false,
    }
  );
};
