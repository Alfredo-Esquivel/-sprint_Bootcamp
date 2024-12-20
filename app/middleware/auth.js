// middleware/auth.js
const jwt = require('jsonwebtoken');
const { secret } = require('../config/auth.config');

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');  // Obtiene el token del encabezado Authorization

  if (!token) {
    return res.status(403).json({ message: 'Access denied, token is missing' });
  }

  try {
    const decoded = jwt.verify(token, secret);  // Verifica el token
    req.user = decoded;  // Guarda la información del usuario en la solicitud
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { verifyToken };



