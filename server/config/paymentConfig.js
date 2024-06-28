/*Variables
stripe*/


require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Reemplazar con tu clave de prueba de Stripe

module.exports = stripe;
