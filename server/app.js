const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const logger = require('./config/log');
const confBd = require('./config/bd');
const vehiculoTipoRoutes = require('./routes/vehiculoTipo.route');
const vehiculoRoutes = require('./routes/vehiculo.route');
const conductorRoutes = require('./routes/conductor.route');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/vehiculos/tipo', vehiculoTipoRoutes);
app.use('/vehiculos', vehiculoRoutes);
app.use('/conductores', conductorRoutes);

mongoose.connect(confBd.uriConexion, {
  useNewUrlParser: true,
  useCreateIndex: true,
}).then(
    () => {
      logger.info('Conexión a base de datos establecida');
    },
    (error)=> {
      logger.error(`Error al intentar conexión a base de datos: ${error}`);
    }
);

module.exports = app;
