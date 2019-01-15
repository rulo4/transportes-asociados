const express = require('express');
const router = express.Router();

const logger = require('../config/log');
const Viaje = require('../models/Viaje');

router.route('/crear').post((request, response) => {
  const viaje = new Viaje(request.body);
  viaje.save((error, viaje) => {
    if (error) {
      logger.error(error);
      response.status(500)
          .json({err: `Error al intentar crear viaje: ${error}`});
    }
    logger.info(`Creado el viaje con id ${viaje._id}`);
    response.json({msj: 'Viaje creado'});
  });
});

router.route('/').get((request, response) => {
  Viaje.find((error, viajes) => {
    if (error) {
      logger.error(error);
      response.status(500).json({
        err: `Error al intentar obtener lista de viajes: ${error}`,
      });
    }
    logger.info('Listando viajes');
    response.json(viajes);
  });
});

router.route('/editar/:id').get((request, response) => {
  const id = request.params.id;
  Viaje.findById(id, (error, viaje) => {
    if (error) {
      logger.error(error);
      response.status(500).json({
        err: `Error al intentar obtener viaje con id ${id}}]`,
      });
    }
    logger.info(`Editando el viaje con id ${viaje._id}`);
    response.json(viaje);
  });
});

router.route('/actualizar/:id').post((request, response) => {
  const id = request.params.id;
  Viaje.findById(request.params.id, (error, viaje) => {
    if (error) {
      logger.error(error);
      response.status(500).json({
        err: `Error al intentar obtener viaje con id ${id}}]`,
      });
    }
    if (!viaje) {
      logger.error(`No encontrado el viaje con id ${viaje._id}`);
      response.status(500).json({err: 'Viaje no encontrado'});
    }

    viaje._conductor = request.body._conductor;
    viaje._vehiculo = request.body._vehiculo;
    viaje.origen = request.body.origen;
    viaje.destino = request.body.destino;
    viaje.pasajero = request.body.pasajero;
    viaje.empresa = request.body.empresa;
    viaje.iniciofec = request.body.iniciofec;
    viaje.finfec = request.body.finfec;
    viaje.save((error) => {
      if (error) {
        logger.error(error);
        response.status(500).json({
          err: `Error al intentar actualizar el viaje con id ${id}`,
        });
      }
      logger.info(`Actualizado el viaje con id ${viaje._id}`);
      response.json({msj: 'Actualización exitosa'});
    });
  });
});

router.route('/eliminar/:id').get((request, response) => {
  const id = request.params.id;
  Viaje.findByIdAndRemove({_id: id}, (error) => {
    if (error) {
      logger.error(error);
      response.status(500)
          .json({err: `Error al intentar eliminar viaje con id ${id}`});
    }
    logger.info(`Eliminado el viaje con id ${id}`);
    response.json({msj: 'Viaje eliminado'});
  });
});

module.exports = router;
