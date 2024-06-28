/*Variables
express
router
cartController

Funciones
router.get
router.post*/


const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Rutas de carrito
router.get('/:sesionId', cartController.obtenerCarrito);
router.post('/add', cartController.agregarAlCarrito);
router.post('/remove', cartController.eliminarDelCarrito);

module.exports = router;
