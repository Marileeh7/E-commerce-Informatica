/*Variables
jwt
Usuario
proteger
esAdmin

Funciones
proteger
esAdmin*/


const jwt = require('jsonwebtoken');
const Usuario = require('../models/User');
require('dotenv').config();

// Middleware para verificar el token de autenticación desde las cookies
const proteger = async (req, res, next) => {
  let token;
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ mensaje: 'No autorizado, no hay token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = await Usuario.findById(decoded.id).select('-contraseña');
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'No autorizado, token inválido' });
  }
};

// Middleware para verificar si el usuario es administrador
const esAdmin = (req, res, next) => {
  if (req.usuario && req.usuario.isAdmin) {
    next();
  } else {
    res.status(403).json({ mensaje: 'No autorizado, requiere rol de administrador' });
  }
};

module.exports = { proteger, esAdmin };
