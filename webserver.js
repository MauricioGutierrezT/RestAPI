const constants = require('./constants')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const session = require('express-session');
const router = require('./Controllers/router');


/**
 * Parametros de funcion de sesion
 * @param {object} app
*/
function configureSecurity(app){
//  app.use (session({
//      secret: '',
//      resave: false,
//      saveUninitialized: false,
//  }));
console.log('No se ha configurado la seguridad de la sesion');
}

/**
 * Static files and views configuration function.
 * param {*} app
 */
//function configStaticFilesAndVies(app){
//    app.set('view engine', 'ejs');
//
//    app.use(express.static('./public'));
//    app.use(router);
//}

/**
 * Server configuration function.
 * configura el servidor con cors y bodyParser
 * @param {*} app
 */
function configureServer(app){
    app.use(cors()); //inicializa el middleware de cors
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));
    app.use(router);
}

/** 
 * Creas el servidor y lo regresa con los middlewares configurados
 *  @returns
 */
function createServer(){
    const app = express();
    configureServer(app);
    //configStaticFilesAndVies(app);
    configureSecurity(app);
    const server = require('http').createServer(app);
    return server;
}


/** 
 * Web project initialization function.
 * 1. Crea y configuras el servidor
 * 2. Inicializa el socket
 * 3. Empieza el servidor en el puerto definido
 * 
 * @param {object} app
 */
function ProyectoWeb(){
    const server = createServer();
    server.listen(constants.port, () => {
        console.log('Servidor iniciado en el puerto ' + constants.port);
    });
}

module.exports = {ProyectoWeb};