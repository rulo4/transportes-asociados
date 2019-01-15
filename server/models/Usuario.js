const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Usuario = new Schema({
  nombre: {
    type: String,
  },
  apellidos: {
    type: String,
  },
  usuario: {
    type: String,
  },
  contrasena: {
    type: String,
  },
  token: {
    type: String,
  },
  ultimoAcceso: {
    type: Date,
  },
  intentosFallidos: {
    type: Number,
  },
},
{
  collections: 'usuarios',
});

module.exports = mongoose.model('Usuario', Usuario);
