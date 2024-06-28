
/*Variables
express
router
authController

Funciones
router.post*/


const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rutas de autenticación
router.post('/register', authController.registrar);
router.post('/login', authController.iniciarSesion);
router.post('/logout', authController.cerrarSesion);
router.post('/reset-password', authController.solicitarRestablecimiento);
router.post('/reset/:token', authController.restablecerContraseña);

module.exports = router;
