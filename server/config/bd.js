require('dotenv').config();

const usuario = process.env.BD_USUARIO;
const contrasena = process.env.BD_CONTRASENA;
const servidor = process.env.BD_SERVIDOR;
const puerto = process.env.BD_PUERTO;
const baseDatos = process.env.BD_NOMBRE;

const confBd = {
  uriConexion: `mongodb://${usuario}:${contrasena}@${servidor}:${puerto}/${baseDatos}`,
};

module.exports = confBd;
