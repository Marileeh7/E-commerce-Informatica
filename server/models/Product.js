/* variables
mongoose
productoSchema*/


const mongoose = require('mongoose');

// Definir el esquema del producto
const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  categoria: { type: String, required: true },
  subCategoria: { type: String, required: true },
  stock: { type: Number, required: true },
  imagen: { type: String, required: true },
  calificaciones: [{ userId: mongoose.Schema.Types.ObjectId, rating: Number, comentario: String }],
});

module.exports = mongoose.model('Producto', productoSchema);
