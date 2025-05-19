const dataSource = require('../Datasource/MySQLMngr');
/**
 * @param {*} user
 * returns
*/ 
async function getRegistros(idUsuario) {
    let qResult;
    try 
    {
        let query = "SELECT * FROM formularioInicial WHERE idUsuario = ?";
        let params = [idUsuario];
        qResult = await dataSource.getDataWithParams(query, params);
    }
    catch(err)
    {
        qResult = new dataSource.QueryResult(false, [], 0, 0, err.message);
    }
    return qResult;
}
/**
 * @param {*} fi
 * @returns 
*/
async function getRegistrosPorUsuario(fi) {
    const allowedT = [
        'variables_climaticas',
        'camaras_trampa',
        'validacion_cobertura',
        'parcela_vegetacion',
        'fauna_transecto',
        'fauna_punto_conteo',
        'fauna_busqueda_libre']
        if(!allowedT.includes(fi.tipoRegistro)) {
            throw new Error('Tabla no existente');
        }
    let qResult;
    try
    {
        let query = `
        SELECT T.* 
        FROM ${fi.tipoRegistro} T
        JOIN formularioInicial F ON T.idRegistro = F.idFormIn
        WHERE F.idCreador = ?
        `;
        let params = [fi.idCreador];
        qResult = await dataSource.getDataWithParams(query, params);
    }
    catch(err)
    {
        qResult = new dataSource.QueryResult(false, [], 0, 0, err.message);
    }
    return qResult;
}
/**
 * @param {*} form
 * @returns
 */
async function updateRegistro(form, idRegistro) {
    let qResult;
    try
    {
        let query1 = "UPDATE formularioInicial SET estadoTiempo = ?, estacion = ?, tipoRegistro = ? WHERE idFormIn = ?";
        let params1 = [
            form.estadoTiempo,
            form.estacion,
            form.tipoRegistro,
            form.idFormIn
        ];
        qResult = await dataSource.updateData(query1, params1);

        let query, params, qResult2;
        const r2 = await getRegistrosPorUsuario(form);

        if (r2.success) {
            switch(form.tipoRegistro) {
                case 'variables_climaticas':
                    query = "UPDATE variables_climaticas SET zona = ?, pluviosidadMm = ?, temperaturaMaxima = ?, humedadMaxima = ?, temperaturaMinima = ?, nivelQuebradaMt = ? WHERE idRegistro = ?";
                    params = [form.zona, form.pluviosidadMm, form.temperaturaMaxima, form.humedadMaxima, form.temperaturaMinima, form.nivelQuebradaMt, idRegistro];
                    break;
                case 'camaras_trampa':
                    query = "UPDATE camaras_trampa SET codigo = ?, zona = ?, nombreCamara = ?, placaCamara = ?, placaGuaya = ?, anchoCaminoft = ?, fechaInstalacion = ?, distanciaObjetivoMt = ?, alturaLenteMt = ?, listaChequeo = ?, evidencias = ?, observaciones = ? WHERE idRegistro = ?";
                    params = [form.codigo, form.zona, form.nombreCamara, form.placaCamara, form.placaGuaya, form.anchoCaminoft, form.fechaInstalacion, form.distanciaObjetivoMt, form.alturaLenteMt, form.listaChequeo, form.evidencias, form.observaciones, idRegistro];
                    break;
                case 'fauna_busqueda_libre':
                    query = "UPDATE fauna_busqueda_libre SET zona = ?, tipoAnimal = ?, nombreComun = ?, nombreCientifico = ?, numeroIndividuos = ?, tipoObservacion = ?, alturaObservacion = ?, evidencias = ?, observaciones = ? WHERE idRegistro = ?";
                    params = [form.zona, form.tipoAnimal, form.nombreComun, form.nombreCientifico, form.numeroIndividuos, form.tipoObservacion, form.alturaObservacion, form.evidencias, form.observaciones, idRegistro];
                    break;
                case 'fauna_punto_conteo':
                    query = "UPDATE fauna_punto_conteo SET zona = ?, tipoAnimal = ?, nombreComun = ?, nombreCientifico = ?, numeroIndividuos = ?, tipoObservacion = ?, alturaObservacion = ?, evidencias = ?, observaciones = ? WHERE idRegistro = ?";
                    params = [form.zona, form.tipoAnimal, form.nombreComun, form.nombreCientifico, form.numeroIndividuos, form.tipoObservacion, form.alturaObservacion, form.evidencias, form.observaciones, idRegistro];
                    break;
                case 'fauna_transecto':
                    query = "UPDATE fauna_transecto SET numeroTransecto = ?, tipoAnimal = ?, nombreComun = ?, nombreCientifico = ?, nroIndividuos = ?, tipObservacion = ?, evidencias = ?, observaciones = ? WHERE idRegistro = ?";
                    params = [form.numeroTransecto, form.tipoAnimal, form.nombreComun, form.nombreCientifico, form.nroIndividuos, form.tipObservacion, form.evidencias, form.observaciones, idRegistro];
                    break;
                case 'parcela_vegetacion':
                    query = "UPDATE parcela_vegetacion SET cuadrante = ?, sobcuadrante = ?, habitoCrecimiento = ?, nombreComun = ?, nombreCientifico = ?, placa = ?, circunferencia = ?, distanciaMt = ?, estaturaBiomonitorMt = ?, alturaMt = ?, evidencias = ?, observaciones = ? WHERE idRegistro = ?";
                    params = [form.cuadrante, form.sobcuadrante, form.habitoCrecimiento, form.nombreComun, form.nombreCientifico, form.placa, form.circunferencia, form.distanciaMt, form.estaturaBiomonitorMt, form.alturaMt, form.evidencias, form.observaciones, idRegistro];
                    break;
                case 'validacion_cobertura':
                    query = "UPDATE validacion_cobertura SET codigo = ?, seguimiento = ?, cambio = ?, cobertura = ?, tiposCultivo = ?, disturbio = ?, evidencias = ?, observaciones = ? WHERE idRegistro = ?";
                    params = [form.codigo, form.seguimiento, form.cambio, form.cobertura, form.tiposCultivo, form.disturbio, form.evidencias, form.observaciones , idRegistro];
                    break;
                default:
                    throw new Error('Tipo de registro no válido');
            }
            // Solo ejecuta el update si query y params están definidos
            if (query && params) {
                qResult2 = await dataSource.updateData(query, params);
            } else {
                throw new Error('No se pudo construir el query de actualización');
            }
            return {success: true, qResult, qResult2};
        } else {
            throw new Error('No se encontró el registro a actualizar');
        }
    } catch(err) {
        return {success: false, error: err.message};
    }
}

/**
 * @returns
 */

async function getUsersNoAceptados() 
{
    let qResult;
    try
    {
        let query = "SELECT * FROM usuario WHERE estado = ?";
        let params = [0];
        qResult = await dataSource.getDataWithParams(query, params);
    }
    catch(err)
    {
        qResult = new dataSource.QueryResult(false, [], 0,0, err.message);
    }
    return qResult;
}
/**
 * @returns
 * @param {*} idUsuario 
 */
async function AceptarUsuario(idUsuario)
{
    let qResult;
    try
    {
        let query = "UPDATE usuario SET estado = ? WHERE idUsuario = ? OR idResponsable = ?";
        let params = [1, idUsuario, idUsuario];
        qResult = await dataSource.updateData(query, params);
    }
    catch(err)
    {
        qResult = new dataSource.QueryResult(false, [], 0, 0, err.message);
    }
    return qResult;
}

module.exports = (getRegistros, getRegistrosPorUsuario, updateRegistro, getUsersNoAceptados, AceptarUsuario);