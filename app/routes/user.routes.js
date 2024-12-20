// app/routes/user.routes.js
const express = require('express');
const router = express.Router();
const { checkDuplicateEmail } = require('../middleware/verifySingUp');
const userController = require('../controllers/user.controller');
const { verifyToken } = require('../middleware/auth');

// Rutas públicas
router.post('/signup', checkDuplicateEmail, userController.createUser);  // Ruta para crear usuario
router.post('/login', userController.loginUser);



// Rutas protegidas
router.get('/user/:id', verifyToken, userController.findUserById);
router.get('/users', verifyToken, userController.findAll);
router.put('/user/:id', verifyToken, userController.updateUserById);
router.delete('/user/:id', verifyToken, userController.deleteUserById);

module.exports = router;
