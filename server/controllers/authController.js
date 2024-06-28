
/*Variables

Usuario
jwt
crypto
transportador
bcrypt

Funciones
registrar
iniciarSesion
cerrarSesion
solicitarRestablecimiento
restablecerContraseña*/


const Usuario = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const transportador = require('../config/emailConfig');
const bcrypt = require('bcrypt');

// Registrar nuevo usuario
exports.registrar = async (req, res) => {
  const { nombre, email, contraseña } = req.body;
  try {
    const nuevoUsuario = new Usuario({ nombre, email, contraseña });
    await nuevoUsuario.save();
    res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar usuario' });
  }
};

// Iniciar sesión
exports.iniciarSesion = async (req, res) => {
  const { email, contraseña } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario || !(await usuario.comparePassword(contraseña))) {
      return res.status(400).json({ mensaje: 'Credenciales inválidas' });
    }
    const token = jwt.sign({ id: usuario._id, isAdmin: usuario.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.json({ mensaje: 'Inicio de sesión exitoso' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión' });
  }
};

// Cerrar sesión
exports.cerrarSesion = (req, res) => {
  res.clearCookie('token');
  res.json({ mensaje: 'Sesión cerrada exitosamente' });
};

// Solicitar restablecimiento de contraseña
exports.solicitarRestablecimiento = async (req, res) => {
  const { email } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ mensaje: 'No se encontró un usuario con ese correo electrónico' });
    }

    // Generar token de restablecimiento
    const token = crypto.randomBytes(20).toString('hex');
    usuario.resetPasswordToken = token;
    usuario.resetPasswordExpires = Date.now() + 3600000; // 1 hora
    await usuario.save();

    // Enviar correo electrónico
    const opcionesCorreo = {
      to: email,
      from: process.env.EMAIL_USER,
      subject: 'Restablecimiento de contraseña',
      text: `Está recibiendo este correo electrónico porque usted (u otra persona) ha solicitado restablecer la contraseña de su cuenta.\n\n
             Por favor haga clic en el siguiente enlace, o péguelo en su navegador para completar el proceso:\n\n
             http://${req.headers.host}/api/auth/reset/${token}\n\n
             Si no solicitó esto, por favor ignore este correo electrónico y su contraseña permanecerá sin cambios.\n`,
    };

    transportador.sendMail(opcionesCorreo, (error) => {
      if (error) {
        return res.status(500).json({ mensaje: 'Error al enviar el correo electrónico' });
      }
      res.json({ mensaje: 'Correo electrónico de restablecimiento de contraseña enviado' });
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al solicitar restablecimiento de contraseña' });
  }
};

// Restablecer contraseña
exports.restablecerContraseña = async (req, res) => {
  const { token } = req.params;
  const { nuevaContraseña } = req.body;
  try {
    const usuario = await Usuario.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!usuario) {
      return res.status(400).json({ mensaje: 'Token de restablecimiento de contraseña inválido o expirado' });
    }

    // Actualizar contraseña
    usuario.contraseña = nuevaContraseña;
    usuario.resetPasswordToken = undefined;
    usuario.resetPasswordExpires = undefined;
    await usuario.save();

    res.json({ mensaje: 'Contraseña restablecida exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al restablecer la contraseña' });
  }
};
