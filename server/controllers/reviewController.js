/*Variables
Reseña
Funciones
agregarReseña
editarReseña
eliminarReseña*/

const Reseña = require('../models/Review');

// Agregar reseña
exports.agregarReseña = async (req, res) => {
  const { productId, userId, rating, comentario } = req.body;
  try {
    const nuevaReseña = new Reseña({ productId, userId, rating, comentario });
    await nuevaReseña.save();
    res.status(201).json({ mensaje: 'Reseña agregada exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al agregar reseña' });
  }
};

// Editar reseña
exports.editarReseña = async (req, res) => {
  const { id } = req.params;
  const { rating, comentario } = req.body;
  try {
    await Reseña.findByIdAndUpdate(id, { rating, comentario });
    res.json({ mensaje: 'Reseña actualizada exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar reseña' });
  }
};

// Eliminar reseña
exports.eliminarReseña = async (req, res) => {
  const { id } = req.params;
  try {
    await Reseña.findByIdAndDelete(id);
    res.json({ mensaje: 'Reseña eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar reseña' });
  }
};
