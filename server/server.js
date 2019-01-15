require('dotenv').config();
const logger = require('./config/log');
const port = process.env.PORT;
const app = require('./app');

app.listen(port, ()=>{
  logger.info(`Servidor iniciado, escuchando en el puerto ${port}`);
});
