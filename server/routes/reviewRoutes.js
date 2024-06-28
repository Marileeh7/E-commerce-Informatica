/*Variables
express
router
reviewController
proteger

Funciones
router.post
router.put
router.delete*/

const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { proteger } = require('../middleware/auth');

// Rutas de reseñas
router.post('/', proteger, reviewController.agregarReseña); // Solo usuario registrado puede agregar
router.put('/:id', proteger, reviewController.editarReseña); // Solo usuario registrado puede editar
router.delete('/:id', proteger, reviewController.eliminarReseña); // Solo usuario registrado puede eliminar

module.exports = router;

