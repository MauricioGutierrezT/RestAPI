const SAService = require('../../Services/SAdminService');
require('dotenv').config();

/**
 * @param {*} req
 * @param {*} res
 */
async function getRegistros(req, res)
{
    try
    {
        const idUsuario = req.params.idUsuario;
        const registros = await SAService.getRegistros(idUsuario);
        if(registros.status)
        {
            return res.status(200).json({
                "status"  : "success",
                "total"   : registros.total,
                "registros": registros.data
            });
        }
    }catch(error){
        let jsonError = {
            "status" : "error",
            "message" : error.message
        }
        console.log(error);
        return res.status(500).json(jsonError);
    }
}
/**
 * @param {*} req
 * @param {*} res
*/
async function getRegistrosPorUsuario(req, res)
{
    try
    {
        const fi = req.body;
        const registros = await SAService.getRegistrosPorUsuario(fi);
        return res.status(200).json({
            "status" : "success",
            "total" : registros.total,
            "registros" : registros.data
        });
    } catch(error)
    {
        let jsonError = {
            "status" : "error",
            "message" : error.message
        }
        console.log(error);
        return res.status(500).json(jsonError);
    }
}
/**
 * @param {*} req 
 * @param {*} res 
 */
async function updateRegistro(req, res)
{
    try
    {
        const form = req.body;
        const idRegistro = req.params.idRegistro;
        const result = await SAService.updateRegistro(form, idRegistro);
        return res.status(200).json({
            "status" : "success",
            "total" : result.changes,
            "message" : "Registro actualizado"
        });
    }
    catch(error)
    {
        let jsonError = {
            "status" : "error",
            "message" : error.message
        }
        console.log(error);
        return res.status(500).json(jsonError);
    }
} 
/**
 * @param {*} req 
 * @param {*} res
 */
async function getUsersNoAceptados(req, res)
{
    try
    {
        const result = await SAService.getUsersNoAceptados();
        return res.status(200).json({
            "status" : "success",
            "total" : result.total,
            "records" : result.data
        });
    }
    catch(error)
    {
        let jsonError = {
            "status" : "error",
            "message" : error.message
        }
        console.log(error);
        return res.status(500).json(jsonError);
    }
}

/**
 * @param {*} req
 * @param {*} res
 */
async function AceptarUsuario(req, res)
{
    try
    {
        const idUsuario = req.params.idUsuario;
        const result = await SAService.AceptarUsuario(idUsuario);
        return res.status(200).json({
            "status" : "success",
            "total" : result.changes,
            "records" : result.data
        });
    }
    catch(error)
    {
        let jsonError = {
            "status" : "error",
            "message" : error.message
        }
        console.log(error);
        return res.status(500).json(jsonError);
    }
}

module.exports = (getRegistros, getRegistrosPorUsuario, updateRegistro, getUsersNoAceptados, AceptarUsuario);