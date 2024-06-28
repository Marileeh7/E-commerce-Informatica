
/*models/User.js
Variables
mongoose
bcrypt
crypto
usuarioSchema

Funciones
usuarioSchema.pre
usuarioSchema.methods.comparePassword*/



const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// Definir el esquema del usuario
const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
});

// Encriptar contraseña antes de guardar el usuario
usuarioSchema.pre('save', async function(next) {
  if (!this.isModified('contraseña')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.contraseña = await bcrypt.hash(this.contraseña, salt);
  next();
});

// Método para comparar la contraseña
usuarioSchema.methods.comparePassword = async function(contraseñaIngresada) {
  return await bcrypt.compare(contraseñaIngresada, this.contraseña);
};

module.exports = mongoose.model('Usuario', usuarioSchema);

