/*config/emailConfig.js
Variables
nodemailer
transportador*/



const nodemailer = require('nodemailer');
require('dotenv').config();

const transportador = nodemailer.createTransport({
  service: 'Gmail', // o el servicio que utilices
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

module.exports = transportador;
