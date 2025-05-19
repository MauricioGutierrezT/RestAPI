const dataSource = require('../Datasource/MySQLMngr');
const crypto = require('crypto');
require('dotenv').config();
/** 
 * @param {*} pass
 * @returns
 */

const SALT_SIZE = parseInt(process.env.SALT_SIZE || '12');

const getSalt = () => {
    return crypto.randomBytes(Math.ceil(SALT_SIZE * 3 / 4)).toString('base64url').substring(0, process.env.SALT_SIZE);
}

async function encryptPassword(text, salt){
    const hashing = crypto.createHash('sha512');
    const hash = hashing.update(salt + text).digest('base64url');
    return hash
}

/**
 * @param {*} username
 * @param {*} password
 * @returns
 */
async function isValidUser(username, password){
    //let query = 'SELECT id, name, username, password, age, hash_password from usuario where username = ?';
    let query = 'SELECT idUsuario as id, email, nombre, password FROM usuario WHERE email = ?';
    let params = [username];
    let qResult = await dataSource.getDataWithParams(query, params);
    let user = qResult.rows[0];
    if(user){
        const salt = user.password.substring(0 , SALT_SIZE);
        const hash = await encryptPassword(password, salt);
        const expectedpassword = salt + hash;

        if(user.password === expectedpassword){
            return user;
        }
    }
    return null;
}

module.exports = {encryptPassword, isValidUser, getSalt};