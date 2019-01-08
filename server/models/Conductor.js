const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Conductor = new Schema({
  nombre: {
    type: String,
  },
  apellidos: {
    type: String,
  },
  tipodoc: {
    type: String,
  },
  numerodoc: {
    type: String,
  },
  telefono: {
    type: String,
  },
},
{
  collections: 'conductores',
});

module.exports = mongoose.model('Conductor', Conductor);
