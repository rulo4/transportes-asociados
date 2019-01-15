require('dotenv').config();
const supertest = require('supertest');
const chai = require('chai');
chai.use(require('chai-string'));
const expect = chai.expect;

const server = supertest.agent(`http://localhost:${process.env.PORT}`);

const vehiculoInvalido = {};
const vehiculoValido = {
  placas: 'PYD1009',
  soatfec: '2018-01-12',
  serviciofec: '2018-01-29',
};

describe('Tests CRUD para vehiculos', () => {
  describe('Se solicita la lista de tipos de vehículos', () => {
    it('Se obtiene la lista con los tipos de vehículos', (done) => {
      server.get('/vehiculos/tipo')
          .end((error, response) => {
            expect(response.status).to.be.equal(200);
            expect(response.body).to.be.an('array');
            expect(response.body.length).to.be.greaterThan(0);
            expect(response.body[0]).to.be.an('object')
                .that.includes.all.keys('nombre', 'descripcion');
            vehiculoValido.tipo = response.body[0]._id;
            done();
          });
    });
  });

  describe('Se solicita la creación de un vehículo con datos inválidos', () => {
    it('Se rechaza la solicitud', (done) => {
      server.post('/vehiculos/crear')
          .send(vehiculoInvalido)
          .expect('Content-type', /json/)
          .expect(500)
          .end((error, response) => {
            expect(response.status).to.be.equal(500);
            expect(response.body).to.have.property('err');
            expect(response.body.err)
                .to.startWith('Error al intentar crearlo:');
            done();
          });
    });
  });

  describe('Se solicita la creación de un vehículo con datos válidos', () => {
    it('Se crea un vehículo', (done) => {
      server.post('/vehiculos/crear')
          .send(vehiculoValido)
          .expect('Content-type', /json/)
          .expect(200)
          .end((error, response) => {
            expect(response.status).to.be.equal(200);
            expect(response.body).to.have.property('msj');
            expect(response.body).to.have.property('vehiculo');
            expect(response.body.msj).to.be.equal('Creado');
            vehiculoValido._id = response.body.vehiculo;
            done();
          });
    });
  });

  describe('Se solicita la lista de vehículos', () => {
    it('Se obtiene lista con los vehícullos', (done) => {
      server.get('/vehiculos')
          .expect('Content-type', /json/)
          .expect(200)
          .end((error, response) => {
            expect(response.status).to.be.equal(200);
            expect(response.body).to.be.an('array');
            done();
          });
    });
  });

  describe('Se solicitan los datos de un vehículo inexistente', () => {
    it('Se obtiene un error', (done) => {
      server.get(`/vehiculos/editar/i${vehiculoValido._id}`)
          .expect('Content-type', /json/)
          .expect(500)
          .end((error, response) => {
            expect(response.status).to.be.equal(500);
            expect(response.body).to.have.property('err');
            expect(response.body.err)
                .to.startWith('Error al intentar obtener los datos:');
            done();
          });
    });
  });

  describe('Se solicitan los datos de un vehículo existente', () => {
    it('Se obtienen los datos del vehículo', (done) => {
      server.get(`/vehiculos/editar/${vehiculoValido._id}`)
          .expect('Content-type', /json/)
          .expect(200)
          .end((error, response) => {
            expect(response.status).to.be.equal(200);
            expect(response.body).to.be.an('object');
            expect(response.body._id).to.be.equal(vehiculoValido._id);
            done();
          });
    });
  });

  describe('Se solicita actualizar los datos de un vehículo inexistente',
      () => {
        it('Se obtiene un error', (done) => {
          server.put(`/vehiculos/actualizar/i${vehiculoValido._id}`)
              .expect('Content-type', /json/)
              .expect(500)
              .end((error, response) => {
                expect(response.status).to.be.equal(500);
                expect(response.body).to.have.property('err');
                expect(response.body.err)
                    .to.startWith('Error al intentar obtenerlo:');
                done();
              });
        });
      });

  describe('Se solicita actualizar los datos de un vehículo existente',
      () => {
        it('Se actualiza el vehículo', (done) => {
          server.put(`/vehiculos/actualizar/${vehiculoValido._id}`)
              .send(vehiculoValido)
              .expect('Content-type', /json/)
              .expect(200)
              .end((error, response) => {
                expect(response.status).to.be.equal(200);
                expect(response.body).to.have.property('msj');
                expect(response.body.msj).to.startWith('Actualizado');
                done();
              });
        });
      });

  describe('Se solicita eliminar un vehículo inexistente', () => {
    it('Se obtiene un error', (done) => {
      server.delete(`/vehiculos/eliminar/i${vehiculoValido._id}`)
          .expect('Content-type', /json/)
          .expect(500)
          .end((error, response) => {
            expect(response.status).to.be.equal(500);
            expect(response.body).to.have.property('err');
            expect(response.body.err)
                .to.startWith('Error al intentar eliminarlo:');
            done();
          });
    });
  });

  describe('Se solicita eliminar un vehículo existente', () => {
    it('Se elimina el vehículo', (done) => {
      server.delete(`/vehiculos/eliminar/${vehiculoValido._id}`)
          .expect('Content-type', /json/)
          .expect(200)
          .end((error, response) => {
            expect(response.status).to.be.equal(200);
            expect(response.body).to.have.property('msj');
            expect(response.body.msj).to.startWith('Eliminado');
            done();
          });
    });
  });
});

