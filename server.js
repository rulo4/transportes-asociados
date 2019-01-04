const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const logger = require('./config/winston');
const config = require('./config/db');
const vehiculoRoutes = require('./routes/vehiculo.route');
const port = process.env.PORT || 4000;
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.db, {useNewUrlParser: true}).then(
    ()=> {
      logger.info('Conexión a mongo establecida'),
      (error)=> {
        logger.error(`Error al intentar conexión a mongo: ${error}`);
      };
    }
);

app.use(cors());
app.use(bodyParser.json());
app.use('/vehiculos', vehiculoRoutes);
app.listen(port, ()=>{
  logger.info(`Escuchando en el puerto ${port}`);
});
