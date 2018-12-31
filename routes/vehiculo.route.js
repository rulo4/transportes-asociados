const express = require('express');
const router = express.Router();

const logger = require('../config/winston');
const Vehiculo = require('../models/Vehiculo');

router.route('/crear').post((request, response) => {
  const vehiculo = new Vehiculo(request.body);
  vehiculo.save()
      .then((vehiculo) => {
        response.status(200).json({msj: 'Vehiculo creado'});
      })
      .catch((error) => {
        logger.error(error);
        response.status(400).json({msj: 'Error al intentar crear vehiculo'});
      });
});

router.route('/').get((request, response) => {
  Vehiculo.find((error, vehiculos) => {
    if (error) {
      console.log(error);
      response.json({msj: 'Error al intentar obtener lista de vehiculos'});
    }
    response.json({vehiculos});
  });
});

router.route('/editar/:id').get((request, response) => {
  const id = request.params.id;
  Vehiculo.findById(id, (error, vehiculo) => {
    if (error) {
      console.log(error);
      response.json({msj: 'Error al intentar obtener datos del vehiculo'});
    }
    response.json(vehiculo);
  });
});

router.route('/actualizar/:id').post((request, response) => {
  Vehiculo.findById(request.params.id, (error, vehiculo) => {
    if (error) {
      console.log(error);
      response.json({msj: 'Error al intentar obtener datos del vehiculo'});
    }
    if (!vehiculo) {
      response.json({msj: 'Vehiculo no encontrado'});
    }

    vehiculo.tipo = request.params.tipo;
    vehiculo.placas = request.params.placas;
    vehiculo.soatfec = request.params.soatfec;
    vehiculo.servciofec = request.params.serviciofec;
    vehiculo.save()
        .then((vehiculo) => {
          response.json('Actualización exitosa');
        })
        .catch((error) => {
          response.status(400)
              .json({msj: 'Error al intentar actualizar datos del vechiculo'});
        });
  });
});

router.route('/eliminar/:id').get((request, response) => {
  Vehiculo.findByIdAndRemove({_id: request.params.id}, (error, vehiculo) => {
    if (error) {
      response.json({msj: 'Error al intentar eliminar vehiculo'});
    }
    response.json({msj: 'Vehiculo eliminado'});
  });
});

module.exports = router;
