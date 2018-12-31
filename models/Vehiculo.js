const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Vehiculo = new Schema({
  tipo: {
    type: String,
  },
  placas: {
    type: String,
  },
  soatfec: {
    type: Date,
  },
  serviciofec: {
    type: Date,
  },
},
{
  collections: 'vehiculos',
});

module.exports = mongoose.model('Vehiculo', Vehiculo);
