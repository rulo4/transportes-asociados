const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const logger = require('./config/log');
const confBd = require('./config/bd');
const vehiculoRoutes = require('./routes/vehiculo.route');
const port = process.env.PORT || 4000;
const app = express();

/**
 * Inicia el servidor.
 */
function iniciarServidor() {
  app.use(cors());
  app.use(bodyParser.json());
  app.use('/vehiculos', vehiculoRoutes);
  app.listen(port, ()=>{
    logger.info(`Servidor iniciado, escuchando en el puerto ${port}`);
  });
}

mongoose.connect(confBd.uriConexion, {useNewUrlParser: true}).then(
    ()=> {
      logger.info('Conexión a base de datos establecida');
      iniciarServidor();
    },
    (error)=> {
      logger.error(`Error al intentar conexión a base de datos: ${error}`);
    }
);

