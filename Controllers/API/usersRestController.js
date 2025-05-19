const userService = require('../../Service/usersService');
const hashService = require('../../Service/hashPassword');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.SECRET;

async function execLogin(req, res) {
    const {email, password} = req.body;
    console.log('Login request body:', req.body);
    const result = await userService.getValores(email);
    if (!result.status) {
        return res.status(401).json({message: 'user not found'});
    }
    estado = result.rows[0].estado;
    rol = result.rows[0].rol;

    const user = await hashService.isValidUser(email, password);
    if (!user) {
        return res.status(401).json({message: 'Invalid credentials'});
    }
        const token = jwt.sign(
        {id: user.id, email: user.email},
        SECRET,
        {   expiresIn: '1h' }
    );
    return res.json({  token, rol, estado });
}

/**
 * El middleware que se ejecutara antes para proteger las rutas
 * @param {*} req es el request original
 * @param {*} res la respuesta del usuario
 * @param {*} next el metodo que sera ejecutado
 * @returns accesos no autorizados
 */
    async function authenticateToken(req, res, next)
    {
        let token = null;
        const authHeader = req.headers['authorization'];
        if(authHeader && authHeader.startsWith('Bearer ')){
            token = authHeader.split(' ')[1];
        } else if (req.query && req.query.token){
            token = req.query.token;
        }

        if(!token) return res.sendStatus(401);
        
        jwt.verify(token, SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    }
/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
async function authenticateTokenAdmin(req, res, next)
{
    let token = null;
    const authHeader = req.headers['authorization'];
    if(authHeader && authHeader.startsWith('Bearer ')){
        token = authHeader.split(' ')[1];
    } else if (req.query && req.query.token){
        token = req.query.token;
    }
    if(!token) return res.sendStatus(401);

    jwt.verify(token, SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        if(user.rol === 3){
            req.user = user;
            next();
        } else {
            return res.status(403).json({message: "Unauthorized"});
        }
    })
}
/**
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function authenticateTokenSAdmin(req, res, next)
{
    let token = null;
    const authHeader = req.headers['aunthorization'];
    if(authHeader && authHeader.startsWith('Bearer '))
    {
        token = authHeader.split(' ')[1];
    }
    else if(req.query && req.query.token)
    {
        token = req.query.token;
    }
    if(!token) return res.sendStatus(401);
    jwt.verify(token, SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        if(user.rol === 4)
        {
            req.user = user;
            next();
        }
        else
        {
            return res.status(403).json({message: "Unauthorized"});
        }
    })
}

/**
 * @param {Object} req
 * @param {Object} res
 */
async function getUsers(req, res){
    try{
        const result = await userService.getUsers();
        return res.status(200).json({
            "status"  : "success",
            "total"   : result.rows.length ,
            "records" : result.rows
        });
    }catch(error){
        let jsonError = {
            "status"  : "error",
            "message" : error.message
        };
        console.log(error);
        return res.status(500).json(jsonError);
    }
}
/**
 * Metodo que devuelve el usuario especifico basado en ID
 * @param {Object} req
 * @param {Object} res
 */
async function findUser(req,res)
{
    try
    {
        let username = req.body.username;
        const result = await userService.findUser(username);
        return res.status(200).json({
            "status"   :  "success",
            "total"    :  result.rows.length,
            "records"  :  result.rows
        });
    }
    catch(error)
    {
        let jsonError = {
            "status"  : "error",
            "message" : error.message
        };
        console.log(error);
        return res.status(500).json(jsonError);
        }
    }
/**
 * @param {Object} req
 * @param {Object} res
 */
async function insertUser(req, res)
{
    try
    {
        let user = req.body;
        const result = await userService.insertUser(user);
        return res.status(200).json({
            "status"  : "success",
            "total"   : result.changes,
            "records" : result.gen_id
        });
    }
    catch(error)
    {
        let jsonError = 
        {
            "status"  : "error",
            "message" : error.message
        };
        console.log(error);
        return res.status(500).json(jsonError);
    }
}

/**
 * @param {Object} req
 * @param {Object} res
 */
async function updateUser(req, res)
{
    try
    {
        if(!req.user.id)
        {
            return res.status(401).json({message: "Unauthorized"});
        }
        let userinf = req.body;
        const result = await userService.updateUser(userinf, req.user.id);
        return res.status(200).json({
            "status" : "success",
            "total"  : result.changes
        });
    }
    catch(error)
    {
        let jsonError = {
            "status"  : "error",
            "message" : error.message
        };
        console.log(error);
        return res.status(500).json(jsonError);
    }
}

/**
 * @param {Object} req
 * @param {Object} res
 */
async function deleteUser(req,res)
{
    try
    {
        let user_id = req.body.user_id;
        const result = await userService.deleteUser(user_id);
        return res.status(200).json({
            "status"  : "success",
            "total"   : result.changes
        });
    }
    catch(error)
    {
        let jsonError = {
            "status"  : "error",
            "message" : error.message
        };
        console.log(error);
        return res.status(500).json(jsonError);
    }
}

module.exports = {
    execLogin, authenticateToken, authenticateTokenAdmin, authenticateTokenSAdmin, getUsers, findUser, insertUser, updateUser, deleteUser
}