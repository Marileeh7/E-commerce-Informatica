/*Variables
express
mongoose
cookieParser
rutasAutenticacion
rutasProductos
rutasPedidos
rutasCarrito
rutasReseñas
app
PORT


Funciones
app.use
app.listen*/


const express = require('express');
const mongoose = require('./config/database');
const cookieParser = require('cookie-parser');
const rutasAutenticacion = require('./routes/authRoutes');
const rutasProductos = require('./routes/productRoutes');
const rutasPedidos = require('./routes/orderRoutes');
const rutasCarrito = require('./routes/cartRoutes');
const rutasReseñas = require('./routes/reviewRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware para parsear JSON y cookies
app.use(express.json());
app.use(cookieParser());

// Rutas
app.use('/api/auth', rutasAutenticacion);
app.use('/api/products', rutasProductos);
app.use('/api/orders', rutasPedidos);
app.use('/api/cart', rutasCarrito);
app.use('/api/reviews', rutasReseñas);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
