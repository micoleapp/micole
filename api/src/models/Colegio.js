const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo y le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Colegio",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      nombre_escuela: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            args: true,
            msg: "El nombre solo puede contener letras",
          },
          len: {
            args: [2, 60],
            msg: "El nombre debe tener entre 2 y 50 letras",
          },
        },
      },

      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            args: true,
            msg: "El apellido solo puede contener letras",
          },
          len: {
            args: [2, 50],
            msg: "El apellido debe tener entre 2 y 50 letras",
          },
        },
      },

      direccion: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      ruc: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
          len: [12],
          msg: "El RUC debe contener 12 caracteres",
        },
      },

      numero_estudiantes: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      fecha_fundacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [4, 4],
          msg: "Debe colocar un año valido",
        },
      },

      nombre_director: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            args: true,
            msg: "El nombre solo puede contener letras",
          },
          len: {
            args: [2, 60],
            msg: "El nombre debe tener entre 2 y 50 letras",
          },
        },
      },

      area: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      cuota_ingreso: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      pension: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      matricula: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      ugel: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      ubicacion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [0, 200],
        },
      },

      telefono: {
        type: DataTypes.BIGINT,
        allowNull: true,
        validate: {
          len: [11],
        },
      },

      referencia_ubicacion: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      propuesta_valor: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      horas_idioma_extrangero: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

      video_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      // isBanned: {
      //   type: DataTypes.BOOLEAN,
      //   defaultValue: false,
      // },
      // avatar: {
      //   type: DataTypes.STRING,
      //   defaultValue:
      //     "http://www.elblogdecha.org/wp-content/uploads/2021/06/perfil-vacio.jpg",
      // },
    },
    {
      timestamps: true,
    }
  );
};
