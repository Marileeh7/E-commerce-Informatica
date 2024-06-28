/*Variables
mongoose
pedidoSchema*/



const mongoose = require('mongoose');

// Definir el esquema del pedido
const pedidoSchema = new mongoose.Schema({
  productos: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
    cantidad: { type: Number, required: true },
  }],
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  total: { type: Number, required: true },
  datosEnvio: {
    direccion: { type: String, required: true },
    ciudad: { type: String, required: true },
    pais: { type: String, required: true },
    codigoPostal: { type: String, required: true },
  },
  fechaPedido: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Pedido', pedidoSchema);
