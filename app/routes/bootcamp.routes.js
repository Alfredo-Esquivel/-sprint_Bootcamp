//bootcamp.routes.js
const express = require('express');
const { verifyToken } = require('../middleware/auth');  // Middleware para proteger rutas
const {
  createBootcamp,
  addUser,
  findById,
  findAll,
} = require('../controllers/bootcamp.controller');

const router = express.Router();

// Crear un bootcamp
router.post('/',verifyToken, createBootcamp);  // Esta es la ruta correcta para crear un bootcamp

// Asociar un usuario a un bootcamp
router.post('/:bootcampId/user/:userId',verifyToken, addUser);

//Ruta para obtener un bootcamp por ID
router.get('/:id', verifyToken, findById);

// Ruta para obtener todos los bootcamps
router.get('/',findAll); 

module.exports = router;


