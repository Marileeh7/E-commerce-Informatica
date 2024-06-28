/*Variables
Pedido
stripe
crypto

Funciones
crearPedido
obtenerPedidosUsuario
obtenerTodosLosPedidos*/


const Pedido = require('../models/Order');
const stripe = require('../config/paymentConfig');
const crypto = require('crypto');

// Crear nuevo pedido
exports.crearPedido = async (req, res) => {
  const { productos, usuario, total, datosEnvio, token } = req.body;

  // Encriptar datos del cliente
  const cipher = crypto.createCipher('aes-256-cbc', 'clave_secreta');
  let datosEncriptados = cipher.update(JSON.stringify(datosEnvio), 'utf8', 'hex');
  datosEncriptados += cipher.final('hex');

  try {
    const cargo = await stripe.charges.create({
      amount: total * 100, // Convertir a centavos
      currency: 'usd',
      source: token,
      description: 'Compra en tienda de electrónica',
    });

    const nuevoPedido = new Pedido({ productos, usuario, total, datosEnvio: datosEncriptados });
    await nuevoPedido.save();
    res.status(201).json({ mensaje: 'Pedido creado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear pedido' });
  }
};

// Obtener pedidos del usuario
exports.obtenerPedidosUsuario = async (req, res) => {
  const { usuarioId } = req.params;
  try {
    const pedidos = await Pedido.find({ usuario: usuarioId });
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener pedidos del usuario' });
  }
};

// Obtener todos los pedidos (solo admin)
exports.obtenerTodosLosPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener pedidos' });
  }
};
