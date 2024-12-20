// app/middleware/verifySignUp.js
const db = require('../models');
const User = db.User;

// Middleware para verificar si el correo ya está en uso
const checkDuplicateEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
    });

    if (user) {
      return res.status(400).send({ message: 'El correo ya está en uso' });
    }

    next();  // Si el correo no está en uso, continúa con la creación del usuario
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Hubo un error al verificar el correo' });
  }
};

module.exports = { checkDuplicateEmail };



