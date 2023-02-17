require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

const sequelize =
  process.env.NODE_ENV === 'production'
    ? new Sequelize({
        database: DB_NAME,
        dialect: 'postgres',
        host: DB_HOST,
        port: DB_PORT,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
        {
          logging: false, // set to console.log to see the raw SQL queries
          native: false, // lets Sequelize know we can use pg-native for ~30% more speed
        }
      );

//postgres://tupcideal_api_user:KFHE3ZJeeTdvfEcBS14GUrEwYtAzsv3E@dpg-cd8u5lqrrk0a86rqejpg-a/tupcideal_api

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  Auth,
  Colegio,
  Pais,
  Departamento,
  Provincia,
  Plan_Pago,
  Distrito,
  Idioma,
  Infraestructura,
  Infraestructura_tipo,
  Review,
  User,
} = sequelize.models;

// Aca vendrian las relaciones
Colegio.belongsToMany(Idioma, { through: 'Colegio_Idioma', timestamps: false });
Idioma.belongsToMany(Colegio, { through: 'Colegio_Idioma', timestamps: false });

//------RELACION DE AUTENTICACION-----
User.belongsTo(Auth, { foreignKey: 'idAuth', onDelete: 'CASCADE' });
Colegio.belongsTo(Auth, { foreignKey: 'idAuth', onDelete: 'CASCADE' });
//------RELACIONES DE UBICACION------
Pais.hasMany(Colegio, {
  foreignKey: 'PaisId',
});
Colegio.belongsTo(Pais, {
  foreignKey: 'PaisId',
});

Departamento.hasMany(Colegio, {
  foreignKey: 'DepartamentoId',
});
Colegio.belongsTo(Departamento, {
  foreignKey: 'DepartamentoId',
});

Provincia.hasMany(Colegio, {
  foreignKey: 'ProvinciaId',
});
Colegio.belongsTo(Provincia, {
  foreignKey: 'ProvinciaId',
});

Distrito.hasMany(Colegio, {
  foreignKey: 'DistritoId',
});
Colegio.belongsTo(Distrito, {
  foreignKey: 'DistritoId',
});

Departamento.hasMany(Provincia);
Provincia.belongsTo(Departamento);

Provincia.hasMany(Distrito, {
  foreignKey: 'ProvinciaId',
});
Distrito.belongsTo(Provincia, {
  foreignKey: 'ProvinciaId',
});

Colegio.belongsToMany(Infraestructura, {
  through: 'Colegio_Infraestructura',
  timestamps: false,
});
Infraestructura.belongsToMany(Colegio, {
  through: 'Colegio_Infraestructura',
  timestamps: false,
});

//------RELACIONES ADMINISTRATIVAS------

Plan_Pago.hasMany(Colegio, {
  foreignKey: 'PlanPagoId',
});
Colegio.belongsTo(Plan_Pago, {
  foreignKey: 'PlanPagoId',
});

Infraestructura_tipo.hasMany(Infraestructura);
Infraestructura.belongsTo(Infraestructura_tipo);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
