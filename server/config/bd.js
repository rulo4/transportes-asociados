const usuario = 'taDev';
const contrasena = 'taDevPwd';
const servidor = 'localhost';
const puerto = '22019';
const baseDatos = 'development';

const confBd = {
  uriConexion: `mongodb://${usuario}:${contrasena}@${servidor}:${puerto}/${baseDatos}`,
};

module.exports = confBd;
