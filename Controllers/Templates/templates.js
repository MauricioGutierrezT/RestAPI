const constants = require("../../constants");
/** 
 * param {Object} req Client Request
 * param {Object} res Server Response
*/
async function index(req, res) {
    res.redirect(constants.contextURL);
}

async function homePage(req, res){
    res.render('index', {title:'Index', header:'Bienvenido al reto de API'});
}

module.exports = {index, homePage};