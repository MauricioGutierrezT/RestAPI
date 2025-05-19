const jwt = require('jsonwebtoken');
const userService = require('../../Service/usersService');
const formsService = require('../../Service/formsService');
require('dotenv').config();

const SECRET = process.env.SECRET;

/**
 * @param {*} req 
 * @param {*} res 
 */
async function insertVClimaticas(req, res) {
    try
    {
        if(!req.user.id)
        {
            console.log('❌ Token sin ID:', req.user);
            return res.status(401).json({message: 'Unauthorized'});
        } 
        let form = req.body;
        const result = await formsService.insertVClimaticas(form, req.user.id);
        return res.status(200).json({
            "status" : "success",
            "total" : result.changes,
            "records" : result.gen_id
        });
    }
    catch(error)
    {
        let jsonError = {
            "status" : "error",
            "message" : error.message
        };
        console.log(error);
        return serverError(res,error);
    }
}

/**
 * @param {*} req
 * @param {*} res
 */
async function insertCamarasTrampa(req, res) {
    try
    {
        if(!req.user.id)
        {
            return res.status(401).json({message: "Unauthorized"});
        }
        let form = req.body;
        const result = await formsService.insertCamarasTrampa(form, req.user.id);
        return res.status(200).json({
            "status" : "success",
            "total" : result.changes,
            "records" : result.gen_id
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
async function insertFaunaBusquedaLibre(req, res) {
    try
    {
        if(!req.user.id)
        {
            return res.status(401).json({message: "Unauthorized"});
        }
        const idUsuario = req.user.id;
        const result = await formsService.insertFaunaBusquedaLibre(req.body, idUsuario);
        return res.status(200).json({
            "status" : "success",
            "total" : result.changes,
            "records" : result.gen_id
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

async function insertFaunaPuntoConteo(req, res) {
    try
    {
        if(!req.user.id)
        {
            return res.status(401).json({message: "Unauthorized"});
        }
        const idUsuario = req.user.id;
        const result = await formsService.insertFaunaPuntoConteo(req.body, idUsuario);
        return res.status(200).json({
            "status" : "success",
            "total" : result.changes,
            "records" : result.gen_id
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
async function insertFaunaTransecto(req, res){
    try
    {
        if(!req.user.id)
        {
            return res.status(401).json({message: "Unauthorized"});
        }
        const idUsuario = req.user.id;
        const result = await formsService.insertFaunaTransecto(req.body, idUsuario);
        return res.status(200).json({
            "status" : "success",
            "total" : result.changes,
            "records" : result.gen_id
        });
    }
    catch(error)
    {
        let jsonError = {
            "status" : "error",
            "message": error.message
        }
        console.log(error);
        return res.status(500).json(jsonError);
    }
}

/**
 * @param {*} req
 * @param {*} res
 */

async function insertValidacionCobertura(req, res) {
    try
    {
        if(!req.user.id)
        {
            return res.status(401).json({message: "Unauthorized"});
        }
        const idUsuario = req.user.id;
        const result = await formsService.insertValidacionCobertura(req.body, idUsuario);
        return res.status(200).json({
            "status" : "success",
            "total" : result.changes,
            "records" : result.gen_id
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
async function insertParcelaVegetacion(req, res)
{
    try{
        if(!req.user.id)
        {
            return res.status(401).json({message: "Unauthorized"});
        }
        const idUsuario = req.user.id;
        const result = await formsService.insertParcelaVegetacion(req.body, idUsuario);
        return res.status(200).json({
            "status" : "success",
            "total" : result.changes,
            "records" : result.gen_id
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
module.exports = {
    insertVClimaticas,
    insertCamarasTrampa,
    insertFaunaBusquedaLibre,
    insertFaunaPuntoConteo,
    insertFaunaTransecto,
    insertValidacionCobertura,
    insertParcelaVegetacion
}