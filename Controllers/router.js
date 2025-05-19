const express = require('express');
//const templates = require('./Templates/templates');
const usersRest = require('./API/usersRestController');
const imageRest = require('./API/imageRestController');
const constants = require("../constants");

const formRest = require('./API/formRestController');


const router = express.Router();

//router.get(constants.indexURL, templates.index);
//router.get(constants.contextURL, templates.homePage);
// router.get(constants.contextURL+'/login', templates.getLogin);
// router.get(constants.contextURL+'/logout', templates.logout);

//Rutas de la API

router.post(constants.contextURL + constants.apiURL + "/login", usersRest.execLogin);
router.get(constants.contextURL + constants.apiURL + "/getusers", usersRest.authenticateToken, usersRest.getUsers);
router.post(constants.contextURL + constants.apiURL + "/findeUser", usersRest.authenticateToken, usersRest.findUser);
router.post(constants.contextURL + constants.apiURL + "/insertUser", usersRest.insertUser);
router.put(constants.contextURL + constants.apiURL + "/updateUser", usersRest.authenticateToken, usersRest.updateUser);
router.delete(constants.contextURL + constants.apiURL + "/deleteUser", usersRest.authenticateToken, usersRest.deleteUser);

//Imagen
router.post(constants.contextURL + constants.apiURL + "/imageUpload", usersRest.authenticateToken, imageRest.upload, imageRest.processUpload);

//forms
router.post(constants.contextURL + constants.apiURL + "/insertVClimaticas", usersRest.authenticateToken, formRest.insertVClimaticas);
router.post(constants.contextURL + constants.apiURL + "/insertCamarasTrampa", usersRest.authenticateToken, formRest.insertCamarasTrampa);
router.post(constants.contextURL + constants.apiURL + "/insertFaunaBusquedaLibre", usersRest.authenticateToken, formRest.insertFaunaBusquedaLibre);
router.post(constants.contextURL + constants.apiURL + "/insertFaunaPuntoConteo", usersRest.authenticateToken, formRest.insertFaunaPuntoConteo);
router.post(constants.contextURL + constants.apiURL + "/insertFaunaTransecto", usersRest.authenticateToken, formRest.insertFaunaTransecto);
router.post(constants.contextURL + constants.apiURL + "/insertValidacionCobertura", usersRest.authenticateToken, formRest.insertValidacionCobertura);
router.post(constants.contextURL + constants.apiURL + "/insertParcelaVegetacion", usersRest.authenticateToken, formRest.insertParcelaVegetacion);
module.exports = router;