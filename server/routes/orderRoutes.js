
/*Variables
express
router
orderController
proteger
esAdmin

Funciones
router.post
router.get*/


const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { proteger, esAdmin } = require('../middleware/auth');

// Rutas de pedidos
router.post('/', orderController.crearPedido);
router.get('/user/:usuarioId', proteger, orderController.obtenerPedidosUsuario);
router.get('/', proteger, esAdmin, orderController.obtenerTodosLosPedidos); // Solo admin puede ver todos los pedidos

module.exports = router;
