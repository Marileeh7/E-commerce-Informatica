/*Variables
Producto

Funciones
obtenerProductos
agregarProducto
actualizarProducto
eliminarProducto*/

const Producto = require('../models/Product');

// Obtener todos los productos
exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener productos' });
  }
};

// Agregar nuevo producto (solo admin)
exports.agregarProducto = async (req, res) => {
  const { nombre, descripcion, precio, categoria, subCategoria, stock, imagen } = req.body;
  try {
    const nuevoProducto = new Producto({ nombre, descripcion, precio, categoria, subCategoria, stock, imagen });
    await nuevoProducto.save();
    res.status(201).json({ mensaje: 'Producto agregado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al agregar producto' });
  }
};

// Actualizar producto (solo admin)
exports.actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, categoria, subCategoria, stock, imagen } = req.body;
  try {
    await Producto.findByIdAndUpdate(id, { nombre, descripcion, precio, categoria, subCategoria, stock, imagen });
    res.json({ mensaje: 'Producto actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar producto' });
  }
};

// Eliminar producto (solo admin)
exports.eliminarProducto = async (req, res) => {
  const { id } = req.params;
  try {
    await Producto.findByIdAndDelete(id);
    res.json({ mensaje: 'Producto eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar producto' });
  }
};
