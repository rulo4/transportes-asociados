const express = require('express');
const router = express.Router();

const logger = require('../config/log');
const Vehiculo = require('../models/Vehiculo');

router.route('/crear').post((request, response) => {
  const vehiculo = new Vehiculo(request.body);
  vehiculo.save((error, vehiculo) => {
    if (error) {
      logger.error(error);
      response.status(500)
          .json({err: `Error al intentar crear vehiculo: ${error}`});
    }
    logger.info(`Creado el vehículo con id ${vehiculo._id}`);
    response.json({msj: 'Vehiculo creado'});
  });
});

router.route('/').get((request, response) => {
  Vehiculo.find((error, vehiculos) => {
    if (error) {
      logger.error(error);
      response.status(500).json({
        err: `Error al intentar obtener lista de vehiculos: ${error}`,
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
      response.status(500).json({
        err: `Error al intentar obtener vehículo con id ${id}}]`,
      });
    }
    logger.info(`Editando el vehículo con id ${vehiculo._id}`);
    response.json(vehiculo);
  });
});

router.route('/actualizar/:id').post((request, response) => {
  const id = request.params.id;
  Vehiculo.findById(request.params.id, (error, vehiculo) => {
    if (error) {
      logger.error(error);
      response.status(500).json({
        err: `Error al intentar obtener vehículo con id ${id}}]`,
      });
    }
    if (!vehiculo) {
      logger.error(`No encontrado el vehículo con id ${vehiculo._id}`);
      response.status(500).json({err: 'Vehiculo no encontrado'});
    }

    vehiculo.tipo = request.body.tipo;
    vehiculo.placas = request.body.placas;
    vehiculo.soatfec = request.body.soatfec;
    vehiculo.serviciofec = request.body.serviciofec;
    vehiculo.save((error) => {
      if (error) {
        logger.error(error);
        response.status(500).json({
          err: `Error al intentar actualizar el vehículo con id ${id}`,
        });
      }
      logger.info(`Actualizado el vehículo con id ${vehiculo._id}`);
      response.json({msj: 'Actualización exitosa'});
    });
  });
});

router.route('/eliminar/:id').get((request, response) => {
  const id = request.params.id;
  Vehiculo.findByIdAndRemove({_id: id}, (error) => {
    if (error) {
      logger.error(error);
      response.status(500)
          .json({err: `Error al intentar eliminar vehiculo con id ${id}`});
    }
    logger.info(`Eliminado el vehículo con id ${id}`);
    response.json({msj: 'Vehiculo eliminado'});
  });
});

module.exports = router;
