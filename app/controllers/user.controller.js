//user.controller.js
const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/auth.config');
const validator = require('validator'); // Para validar el formato de correo


const User = db.User;

// Crear un nuevo usuario
const createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Validar que el correo sea un correo válido
  if (!validator.isEmail(email)) {
    return res.status(400).send({ message: 'Correo electrónico no válido' });
  }

  // Verificar que la contraseña tenga al menos 8 caracteres
  if (password.length < 8) {
    return res.status(400).send({ message: 'La contraseña debe tener al menos 8 caracteres' });
  }

  try {
    // Verificar si el correo ya está registrado
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).send({ message: 'El correo ya está registrado' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Crear un token JWT para el usuario
    const token = jwt.sign({ id: newUser.id }, secret, { expiresIn: '1h' });

    return res.status(201).send({
      message: 'Usuario creado con éxito',
      user: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    return res.status(500).send({ message: 'Hubo un error al crear el usuario' });
  }
};

// Iniciar sesión de un usuario
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Verificar que el correo esté registrado
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).send({ message: 'Correo o contraseña incorrectos' });
  }

  // Verificar la contraseña
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(404).send({ message: 'Correo o contraseña incorrectos' });
  }

  // Crear el token JWT
  const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });

  return res.status(200).send({
    message: 'Inicio de sesión exitoso',
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
    token,
  });
};

// Obtener un usuario por su ID
const findUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send({ message: 'Usuario no encontrado' });
    }
    return res.status(200).send(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Error al obtener el usuario' });
  }
};

// Obtener todos los usuarios
const findAll = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).send(users);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Error al obtener los usuarios' });
  }
};

// Actualizar un usuario por su ID
const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send({ message: 'Usuario no encontrado' });
    }

    // Si se proporciona una nueva contraseña, encriptarla
    let hashedPassword = user.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    await user.update({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return res.status(200).send({ message: 'Usuario actualizado con éxito' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Error al actualizar el usuario' });
  }
};

// Eliminar un usuario por su ID
const deleteUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send({ message: 'Usuario no encontrado' });
    }

    await user.destroy();
    return res.status(200).send({ message: 'Usuario eliminado con éxito' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Error al eliminar el usuario' });
  }
};

module.exports = {
  createUser,
  loginUser,
  findUserById,
  findAll,
  updateUserById,
  deleteUserById,
};
