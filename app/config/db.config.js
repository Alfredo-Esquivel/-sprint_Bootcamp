// config/db.config.js
module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "Lucas8", 
  DB: "db_jwtbootcamp",  // Nombre de la base de datos
  dialect: "postgres",   // Dialecto como una cadena de texto
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};


