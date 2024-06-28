/*Variables
Carrito

Funciones
obtenerCarrito
agregarAlCarrito
eliminarDelCarrito*/



const Carrito = require('../models/Cart');

// Obtener carrito por sesión
exports.obtenerCarrito = async (req, res) => {
  const { sesionId } = req.params;
  try {
    const carrito = await Carrito.findOne({ sesionId });
    res.json(carrito);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener carrito' });
  }
};

// Agregar producto al carrito
exports.agregarAlCarrito = async (req, res) => {
  const { sesionId, productId, cantidad } = req.body;
  try {
    let carrito = await Carrito.findOne({ sesionId });
    if (!carrito) {
      carrito = new Carrito({ sesionId, productos: [{ productId, cantidad }] });
    } else {
      const productoIndex = carrito.productos.findIndex(p => p.productId.toString() === productId);
      if (productoIndex > -1) {
        carrito.productos[productoIndex].cantidad += cantidad;
      } else {
        carrito.productos.push({ productId, cantidad });
      }
    }
    await carrito.save();
    res.status(201).json({ mensaje: 'Producto agregado al carrito' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al agregar producto al carrito' });
  }
};

// Eliminar producto del carrito
exports.eliminarDelCarrito = async (req, res) => {
  const { sesionId, productId } = req.body;
  try {
    let carrito = await Carrito.findOne({ sesionId });
    if (carrito) {
      carrito.productos = carrito.productos.filter(p => p.productId.toString() !== productId);
      await carrito.save();
      res.json({ mensaje: 'Producto eliminado del carrito' });
    } else {
      res.status(404).json({ mensaje: 'Carrito no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar producto del carrito' });
  }
};
