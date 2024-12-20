const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/db.config');

// Crear la conexión con la base de datos usando las variables del archivo de configuración
const sequelize = new Sequelize(
  dbConfig.DB,         // Nombre de la base de datos
  dbConfig.USER,       // Usuario de la base de datos
  dbConfig.PASSWORD,   // Contraseña de la base de datos
  {
    host: dbConfig.HOST,       // Host de la base de datos
    dialect: dbConfig.dialect, // Dialecto de la base de datos
    pool: dbConfig.pool,       // Configuraciones adicionales del pool
  }
);

// Verificar la conexión
sequelize.authenticate()
  .then(() => {
    console.log('Conexión establecida correctamente.');
  })
  .catch(err => {
    console.error('No se pudo conectar con la base de datos:', err);
  });

// Crear un objeto db para almacenar los modelos
const db = {};

// Importar los modelos
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = require('./user.model.js')(sequelize, DataTypes); // Importar el modelo User
db.Bootcamp = require('./bootcamp.model.js')(sequelize, DataTypes); // Importar el modelo Bootcamp

// Establecer relaciones (importante después de importar todos los modelos)
db.User.associate = (models) => {
  User.belongsToMany(models.Bootcamp, {
    through: 'user_bootcamp',
    foreignKey: 'user_id',
  });
};

db.Bootcamp.associate = (models) => {
  Bootcamp.belongsToMany(models.User, {
    through: 'user_bootcamp',
    foreignKey: 'bootcamp_id',
  });
};

module.exports = db;


