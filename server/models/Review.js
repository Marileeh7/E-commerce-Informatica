/*Variables
mongoose
reseñaSchema*/



const mongoose = require('mongoose');

// Definir el esquema de la reseña
const reseñaSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  rating: { type: Number, required: true },
  comentario: { type: String, required: true },
});

module.exports = mongoose.model('Reseña', reseñaSchema);
