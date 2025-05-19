const dataSource = require('../Datasource/MySQLMngr');

/**
 * @returns
 */
async function insertformInicial(estadoTiempo, estacion, tipoRegistro, idUsuario){
    let qResult;
    try{
        let query = "INSERT INTO formularioinicial (estadoTiempo, estacion, tipoRegistro, idCreador) VALUES (?,?,?,?)";
        let params = [estadoTiempo, estacion, tipoRegistro, idUsuario];
        qResult = await dataSource.insertData(query, params);
    }
    catch(err){
        qResult = new dataSource.QueryResult(false, [], 0,0, err.message);
    }
    return qResult;
}

/**
 * @param {*} form
 * @returns
 */
async function insertVClimaticas(form, idUsuario)
{
    let qResult;
    const consult = await insertformInicial(form.estadoTiempo, form.estacion, form.tipoRegistro, idUsuario);
    console.log('ID del registro creado en formularioinicial:', consult.gen_id);
    if(!consult.status)
    {
        return consult;
    }
    console.log('ID del registro creado en formularioinicial:', consult.gen_id);
    const idRegistro = consult.gen_id;
    try{
        let query = "INSERT INTO variables_climaticas (idRegistro, zona, pluviosidadMm, temperaturaMaxima, humedadMaxima, temperaturaMinima, nivelQuebradaMt) VALUES(?,?,?,?,?,?,?)";
        let params = [
            idRegistro,
            form.zona, 
            form.pluviosidadMm, 
            form.temperaturaMaxima, 
            form.humedadMaxima, 
            form.temperaturaMinima, 
            form.nivelQuebradaMt
        ];
        qResult = await dataSource.insertData(query, params);
    }
    catch(err){
        qResult = new dataSource.QueryResult(false, [],0,0, err.message);
    }
    return qResult;
}


/**
 * @param {*} form
 * @returns
 */
async function insertCamarasTrampa(form, idUsuario)
{
    let qResult;
    const consult = await insertformInicial(form.estadoTiempo, form.estacion, form.tipoRegistro, idUsuario);
    if(!consult.success)
    {
        return consult;
    }
    const idRegistro = consult.gen_id;
    try{
        let query = "INSERT INTO camaras_trampa (idRegistro, codigo, zona, nombreCamara, placaCamara, placaGuaya, anchoCaminoMt, fechaInstalacion, distanciaObjetivoMt, alturaLenteMt, listaChequeo, evidencias, observaciones) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
        let params = [
            idRegistro,
            form.codigo,
            form.zona,
            form.nombreCamara,
            form.placaCamara,
            form.placaGuaya,
            form.anchoCaminoMt,
            form.fechaInstalacion,
            form.distanciaObjetivoMt,
            form.alturaLenteMt,
            form.listaChequeo,
            form.evidencias,
            form.observaciones
        ];
        qResult = await dataSource.insertData(query, params);
    }
    catch(err){
        qResult = new dataSource.QueryResult(false, [], 0,0, err.message);
    }
    return qResult;
}


/**
 * @param {*} form
 * @returns
 */

async function insertFaunaBusquedaLibre(form, idUsuario)
{
    let qResult;
    const consult = await insertformInicial(form.estadoTiempo, form.estacion, form.tipoRegistro, idUsuario);
    if(!consult.success)
    {
        return consult;
    }
    idUsuario = consult.gen_id;
    try
    {
        let query = "INSERT INTO fauna_busqueda_libre (idRegistro, zona, tipoAnimal nombreComun, nombreCientifico, numeroIndividuos, tipoObservacion, alturaObservacion, evidencias, observaciones) VALUES (?,?,?,?,?,?,?,?,?,?)";
        let params = [
            idRegistro,
            form.zona,
            form.tipoAnimal,
            form.nombreComun,
            form.nombreCientifico,
            form.numeroIndividuos,
            form.tipoObservacion,
            form.alturaObservacion,
            form.evidencias,
            form.observaciones
        ];
        qResult = new dataSource.insertData(query, params);
    }catch(err){
        qResult = new dataSource.QueryResult(false, [],0,0,err.message);
    }
    return qResult;
}

/**
 * @param {*} form
 * @returns
 */

async function insertFaunaPuntoConteo(form, idUsuario)
{
    let qResult;
    const consult = await insertformInicial(form.estadoTiempo, form.estacion, form.tipoRegistro, idUsuario);
    if(!consult.success)
    {
        return consult;
    }
    idRegistro = consult.gen_id;
    try
    {
        let query = "INSERT INTO fauna_punto_conteo (idRegistro, form.zona, form.tipoAnimal, form.nombreComun, form.nombreCientifico, numeroIndividuos, tipoObservacion, alturaObservacion, evidencias, observaciones) VALUES (?,?,?,?,?,?,?,?,?,?)";
        let params = [
            idRegistro,
            form.zona,
            form.tipoAnimal,
            form.nombreComun,
            form.nombreCientifico,
            form.numeroIndividuos,
            form.tipoObservacion,
            form.alturaObservacion,
            form.evidencias,
            form.observaciones
        ]
        qResult = await dataSource.insertData(query, params);
    }
    catch(err)
    {
        qResult = new dataSource.QueryResult(false, [], 0,0, err.message);
    }
    return qResult;
}

/**
 * @param {*} form
 * @returns
 */
async function insertFaunaTransecto(form, idUsuario)
{
    let qResult;
    const consult = await insertformInicial(form.estadoTiempo, form.estacion, form.tipoRegistro, idUsuario);
    if(!consult.success)
    {
        return consult;
    }
    idRegistro = consult.gen_id;
    try
    {
        let query = "INSERT INTO fauna_transecto (idRegistro, numeroTransecto, tipoAnimal, nombreComun, nombreCientifico, nroIndividuos, tipoObservacion, evidencias, observaciones) VALUES  (?,?,?,?,?,?,?,?,?)";
        let params = [
            idRegistro,
            form.numeroTransecto,
            form.tipoAnimal,
            form.nombreComun,
            form.nombreCientifico,
            form.nroIndividuos,
            form.tipoObservacion,
            form.evidencias,
            form.observaciones
        ];
        qResult = await dataSource.insertData(query, params);
    }
    catch(err)
    {
        qResult = new dataSource.QueryResult(false, [],0,0,err.message);
    }
    return qResult;
}
/**
 * @param {*} form
 * @returns
 */
async function insertValidacionCobertura(form, idUsuario)
{
    let qResult;
    const consult = await insertformInicial(form.estadoTiempo, form.estacion, form.tipoRegistro, idUsuario);
    if(!consult.success)
    {
        return consult;
    }
    idRegistro = consult.gen_id;
    try
    {
        let query = "INSERT INTO validacion_cobertura (idRegistro, codigo, seguimiento, cambio, cobertura, tiposCultivo, disturbio, evidencias, observaciones) VALUES (?,?,?,?,?,?,?,?,?)";
        let params = [
            idRegistro,
            form.codigo,
            form.seguimiento,
            form.cambio,
            form.cobertura,
            form.tiposCultivo,
            form.disturbio,
            form.evidencias,
            form.observaciones
        ]
        qResult = await dataSource.insertData(query, params);
    }
    catch(err)
    {
        qResult = new dataSource.QueryResult(false, [],0,0,err.message);
    }
    return qResult;
}

/**
 * @param {*} form
 * returns
 */
async function insertParcelaVegetacion(form, idUsuario)
{
    let qResult;
    const consult = await insertformInicial(form.estadoTiempo, form.estacion, form.tipoRegistro, idUsuario);
    if(!consult.success)
    {
        return consult;
    }
    idRegistro = consult.gen_id;
    try
    {
        query = "INSERT INTO parcela_vegetacion (idRegistro, cuadrante, subcuadrante, habitoCrecimiento, nombreComun, nombreCientifico, placa, circunferencias, distanciaMt, estaturaBiomonitorMt, alturaMt, evidencias, observaciones) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
        let params = [
            idRegistro,
            form.cuadrante,
            form.subcuadrante,
            form.habitoCrecimiento,
            form.nombreComun,
            form.nombreCientifico,
            form.placa,
            form.circunferencias,
            form.distanciaMt,
            form.estaturaBiomonitorMt,
            form.alturaMt,
            form.evidencias,
            form.observaciones
        ];
        qResult= await dataSource.insertData(query, params);
    }
    catch(err)
    {
        qResult = new dataSource.QueryResult(false, [], 0,0, err.message);
    }
    return qResult;
}

module.exports = {
    insertVClimaticas,
    insertCamarasTrampa,
    insertFaunaTransecto,
    insertFaunaBusquedaLibre,
    insertFaunaPuntoConteo,
    insertValidacionCobertura,
    insertParcelaVegetacion
}