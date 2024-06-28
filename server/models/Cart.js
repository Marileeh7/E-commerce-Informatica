/*Variables
mongoose
carritoSchema*/

const mongoose = require('mongoose');

// Definir el esquema del carrito
const carritoSchema = new mongoose.Schema({
  productos: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
    cantidad: { type: Number, required: true },
  }],
  sesionId: { type: String, required: true },
});

module.exports = mongoose.model('Carrito', carritoSchema);
