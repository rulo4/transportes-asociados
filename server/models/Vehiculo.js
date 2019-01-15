const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Vehiculo = new Schema({
  tipo: {
    type: Schema.Types.ObjectId,
    uppercase: true,
    required: [true, 'Tipo de vehículo requerido'],
  },
  placas: {
    type: String,
    uppercase: true,
    match: [/^([A-Z]{3}[0-9]{4})$|^([A-Z]{3}[0-9]{3}[A-Z])$/i,
      'El formato de placa es AAA#### ó AAA000A'],
    required: [true, 'Placa del vehículo requerida'],
    unique: true,
  },
  soatfec: {
    type: Date,
    required: [true, 'Fecha de vencimiento del SOAT requerida'],
  },
  serviciofec: {
    type: Date,
    required: [true, 'Fecha de proximo servicio requerida'],
  },
},
{
  collections: 'vehiculos',
});

module.exports = mongoose.model('Vehiculo', Vehiculo);
