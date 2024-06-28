
/*Variables
express
router
productController
proteger
esAdmin

Funciones
router.get
router.post
router.put
router.delete*/


const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { proteger, esAdmin } = require('../middleware/auth');

// Rutas de productos
router.get('/', productController.obtenerProductos);
router.post('/', proteger, esAdmin, productController.agregarProducto); // Solo admin puede agregar
router.put('/:id', proteger, esAdmin, productController.actualizarProducto); // Solo admin puede actualizar
router.delete('/:id', proteger, esAdmin, productController.eliminarProducto); // Solo admin puede eliminar

module.exports = router;
