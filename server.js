const express = require('express');
// const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config/db');
const vehiculoRoutes = require('./routes/vehiculo.route');
const port = process.env.PORT || 4000;
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.db).then(
    ()=> {
      console.log('Conexión a mongo exitosa'),
      (error)=> {
        console.log('Error al intentar conexión a mongo: %s', error);
      };
    }
);

app.use(cors());
app.use(bodyParser.json());
app.use('/vehiculos', vehiculoRoutes);
app.listen(()=>{
  console.log('Escuchando en el puerto %s', port);
});
