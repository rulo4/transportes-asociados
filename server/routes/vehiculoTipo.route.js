const express = require('express');
const router = express.Router();

const logger = require('../config/log');
const VehiculoTipo = require('../models/VehiculoTipo');

router.route('/').get((request, response) => {
  VehiculoTipo.find((error, tipos) => {
    if (error) {
      logger.error(error);
      response.status(500).json({
        err: `Error al intentar obtener lista de tipos de vehículo: ${error}`,
      });
    }
    logger.info('Listando tipos de vehículo');
    response.json(tipos);
  });
});

module.exports = router;
