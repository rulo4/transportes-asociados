const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Viaje = new Schema({
  _conductor: {
    type: ObjectId,
  },
  _vehiculo: {
    type: ObjectId,
  },
  origen: {
    type: Mixed,
  },
  destino: {
    type: Mixed,
  },
  pasajero: {
    type: String,
  },
  empresa: {
    type: String,
  },
  iniciofec: {
    type: Date,
  },
  finfec: {
    type: Date,
  },
},
{
  collections: 'viajes',
});

module.exports = mongoose.model('Viaje', Viaje);
