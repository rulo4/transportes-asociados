const express = require('express');
const router = express.Router();

const logger = require('../config/winston');
const Vehiculo = require('../models/Vehiculo');

router.route('/crear').post((request, response) => {
  const vehiculo = new Vehiculo(request.body);
  vehiculo.save()
      .then(() => {
        logger.info('Vehiculo creado');
        response.json({msj: 'Vehiculo creado'});
      })
      .catch((error) => {
        logger.error(error);
        response
            .json({err: `Error al intentar crear vehiculo: ${e.description}`});
      });
});

router.route('/').get((request, response) => {
  Vehiculo.find((error, vehiculos) => {
    if (error) {
      logger.error(error);
      response.json({
        err: `Error al intentar obtener lista de vehiculos: ${e.description}`,
      });
    }
    logger.info('Listando vehículos');
    response.json(vehiculos);
  });
});

router.route('/editar/:id').get((request, response) => {
  const id = request.params.id;
  Vehiculo.findById(id, (error, vehiculo) => {
    if (error) {
      logger.error(error);
      response.json({err: 'Error al intentar obtener datos del vehiculo'});
    }
    logger.info(`Se está editando el vehículo con id ${id}`);
    response.json(vehiculo);
  });
});

router.route('/actualizar/:id').post((request, response) => {
  Vehiculo.findById(request.params.id, (error, vehiculo) => {
    if (error) {
      logger.error(error);
      response.json({err: 'Error al intentar obtener datos del vehiculo'});
    }
    if (!vehiculo) {
      logger.error(`No se encontró el vehículo con id ${request.params.id}`);
      response.json({err: 'Vehiculo no encontrado'});
    }

    vehiculo.tipo = request.body.tipo;
    vehiculo.placas = request.body.placas;
    vehiculo.soatfec = request.body.soatfec;
    vehiculo.serviciofec = request.body.serviciofec;
    vehiculo.save()
        .then(() => {
          logger.info(`Se actualizó el vehículo con id ${id}`);
          response.json({msj: 'Actualización exitosa'});
        })
        .catch((error) => {
          logger.error(error);
          response
              .json({err: 'Error al intentar actualizar datos del vechiculo'});
        });
  });
});

router.route('/eliminar/:id').get((request, response) => {
  Vehiculo.findByIdAndRemove({_id: request.params.id}, (error, vehiculo) => {
    if (error) {
      logger.error(error);
      response.json({err: 'Error al intentar eliminar vehiculo'});
    }
    logger.info(`Se eliminó el vehículo con id ${request.params._id}`);
    response.json({msj: 'Vehiculo eliminado'});
  });
});

module.exports = router;
