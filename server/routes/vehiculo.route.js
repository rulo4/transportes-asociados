const express = require('express');
const router = express.Router();

const logger = require('../config/log');
const Vehiculo = require('../models/Vehiculo');

router.route('/crear').post((request, response) => {
  const vehiculo = new Vehiculo(request.body);
  vehiculo.save((error, vehiculo) => {
    if (error) {
      logger.error('Error al intentar crear vehiculo: '
      + (error._message ? error._message : error.errmsg));
      response.status(500).json({
        err: 'Error al intentar crearlo: '
            + (error._message ? error._message : error.errmsg),
      });
    } else {
      logger.info(`Creado el vehículo con id ${vehiculo._id}`);
      response.json({msj: 'Creado', vehiculo: vehiculo._id});
    }
  });
});

router.route('/').get((request, response) => {
  Vehiculo.find((error, vehiculos) => {
    if (error) {
      logger.error('Error al intentar obtener lista de vehículos:'
          + ` ${error._message}`);
      response.status(500).json({
        err: `Error al intentar obtener la lista: ${error._message}`,
        det: error.message,
      });
    } else {
      logger.info('Listando vehículos');
      response.json(vehiculos);
    }
  });
});

router.route('/editar/:id').get((request, response) => {
  const id = request.params.id;
  Vehiculo.findById(id, (error, vehiculo) => {
    if (error) {
      logger.error('Error al intentar obtener los datos del vehículo con id '
          + `${id}: ${error.message}`);
      response.status(500).json({
        err: `Error al intentar obtener los datos: ${error.message}`,
        det: error.message,
      });
    } else {
      logger.info(`Editando el vehículo con id ${id}`);
      response.json(vehiculo);
    }
  });
});

router.route('/actualizar/:id').put((request, response) => {
  const id = request.params.id;
  Vehiculo.findById(request.params.id, (error, vehiculo) => {
    if (error) {
      logger.error('Error al intentar obtener vehículo con id '
          + `${id}: ${error._message}`);
      response.status(500).json({
        err:
          `Error al intentar obtenerlo: ${error._message}`,
        det: error.message,
      });
    } else {
      vehiculo.tipo = request.body.tipo;
      vehiculo.placas = request.body.placas;
      vehiculo.soatfec = request.body.soatfec;
      vehiculo.serviciofec = request.body.serviciofec;
      vehiculo.save((error) => {
        if (error) {
          logger.error('Error al intentar actualizar el vehículo con id '
          + `${id}: ${error._message}`);
          response.status(500).json({
            err: `Error al intentar actualizarlo: ${error._message}`,
            det: error.message,
          });
        } else {
          logger.info(`Actualizado el vehículo con id ${id}`);
          response.json({msj: 'Actualizado'});
        }
      });
    }
  });
});

router.route('/eliminar/:id').delete((request, response) => {
  const id = request.params.id;
  Vehiculo.findByIdAndRemove({_id: id}, (error) => {
    if (error) {
      logger.error('Error al intentar eliminar vehiculo con id'
      + `${id}: ${error._message}`);
      response.status(500).json({
        err: `Error al intentar eliminarlo: ${error._message}`,
        det: error.message,
      });
    } else {
      logger.info(`Eliminado el vehículo con id ${id}`);
      response.json({msj: 'Eliminado'});
    }
  });
});

module.exports = router;
