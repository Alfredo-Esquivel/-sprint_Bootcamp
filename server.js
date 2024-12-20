// server.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./app/models');
const userRoutes = require('./app/routes/user.routes');  
const bootcampRoutes = require('./app/routes/bootcamp.routes');

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Rutas
app.use('/api/users', userRoutes);  // Correcta definición de ruta para usuarios
app.use('/api/bootcamps', bootcampRoutes);  // Correcta definición de ruta para bootcamps

// Conexión con la base de datos y el servidor
db.sequelize.sync()
  .then(() => {
    console.log('Conexión a la base de datos establecida con éxito');
    app.listen(5000, () => {
      console.log('Servidor en ejecución en http://localhost:5000');
    });
  })
  .catch((err) => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

