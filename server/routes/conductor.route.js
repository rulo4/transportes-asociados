const express = require('express');
const router = express.Router();

const logger = require('../config/log');
const Conductor = require('../models/Conductor');

router.route('/crear').post((request, response) => {
  const conductor = new Conductor(request.body);
  conductor.save((error, conductor) => {
    if (error) {
      logger.error(error);
      response.status(500)
          .json({err: `Error al intentar crear conductor: ${error}`});
    }
    logger.info(`Creado el conductor con id ${conductor._id}`);
    response.json({msj: 'Conductor creado'});
  });
});

router.route('/').get((request, response) => {
  Conductor.find((error, conductores) => {
    if (error) {
      logger.error(error);
      response.status(500).json({
        err: `Error al intentar obtener lista de conductores: ${error}`,
      });
    }
    logger.info('Listando conductores');
    response.json(conductores);
  });
});

router.route('/editar/:id').get((request, response) => {
  const id = request.params.id;
  Conductor.findById(id, (error, conductor) => {
    if (error) {
      logger.error(error);
      response.status(500).json({
        err: `Error al intentar obtener conductor con id ${id}}]`,
      });
    }
    logger.info(`Editando el conductor con id ${conductor._id}`);
    response.json(conductor);
  });
});

router.route('/actualizar/:id').post((request, response) => {
  const id = request.params.id;
  Conductor.findById(request.params.id, (error, conductor) => {
    if (error) {
      logger.error(error);
      response.status(500).json({
        err: `Error al intentar obtener conductor con id ${id}}]`,
      });
    }
    if (!conductor) {
      logger.error(`No encontrado el conductor con id ${conductor._id}`);
      response.status(500).json({err: 'Conductor no encontrado'});
    }

    conductor.nombre = request.body.nombre;
    conductor.apellidos = request.body.apellidos;
    conductor.tipodoc = request.body.tipodoc;
    conductor.numerodoc = request.body.numerodoc;
    conductor.telefono = request.body.telefono;
    conductor.save((error) => {
      if (error) {
        logger.error(error);
        response.status(500).json({
          err: `Error al intentar actualizar el conductor con id ${id}`,
        });
      }
      logger.info(`Actualizado el conductor con id ${conductor._id}`);
      response.json({msj: 'Actualización exitosa'});
    });
  });
});

router.route('/eliminar/:id').get((request, response) => {
  const id = request.params.id;
  Conductor.findByIdAndRemove({_id: id}, (error) => {
    if (error) {
      logger.error(error);
      response.status(500)
          .json({err: `Error al intentar eliminar conductor con id ${id}`});
    }
    logger.info(`Eliminado el conductor con id ${id}`);
    response.json({msj: 'Conductor eliminado'});
  });
});

module.exports = router;
