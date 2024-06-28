/*Variables
mongoose
dbURI

Funciones
mongoose.connect*/


const mongoose = require('mongoose');
require('dotenv').config();

// Configurar la URL de conexión a la base de datos
const dbURI = process.env.MONGODB_URI;

// Conectarse a la base de datos
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado a la base de datos MongoDB'))
  .catch(err => console.log('Error al conectar a la base de datos', err));

// Exportar la conexión
module.exports = mongoose;
