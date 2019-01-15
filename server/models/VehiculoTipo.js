const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VehiculoTipo = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
},
{
  collections: 'vehiculotipos',
});

module.exports = mongoose.model('VehiculoTipo', VehiculoTipo);
