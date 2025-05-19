const mysql = require('mysql2');
require('dotenv').config()

const HOST = process.env.HOST;
const PORT = process.env.PORT;
const USR = process.env.USR;
const PASS = process.env.PASS;
const DB = process.env.DB;


class QueryResult {

    constructor(status, rows, gen_id, changes, err){
        this.status = status;
        this.rows = rows;
        this.gen_id = gen_id;
        this.changes = changes;
        this.err = err;
    }

    getStatus = () => { return this.status;}
    getRows = () => { return this.rows;}
    getGenId = () => {return this.gen_id;}
    getChanges = () => {return this.changes;}
    getErr = () => {return this.err;}
}

/**
 * 
 * @returns
 */
async function open(){

    const connection = mysql.createConnection({
        host: HOST,
        user: USR,
        port: PORT,
        password: PASS,
        database: DB,
        decimalNumbers: true
    });

    return connection;
}
/**
 * @param {String} query
 * @returns
 */
async function getData(query){
    try{
        console.log("Get Data");
        const conn = await open();
        return new Promise(function(resolve,reject){
            conn.connect((err)=>{
                if(err){
                    reject(err.message);
                } else
                {
                    conn.execute(query,(error,data,fields)=>{
                        conn.end();
                        if(error){
                            reject(error.message)
                        }
                        resolve(new QueryResult(true, data, 0, 0, ''))
                    })
                }
            });
        });
    }catch(error){
        console.log(error);
    }
}

/**
 * @param {String} query
 * @param {Array} params
 * @returns {Object}
 */

async function getDataWithParams(query, params){
    try{
        console.log("GetData");
        const conn = await open();
        return new Promise(function (resolve, reject) {
            conn.connect((err)=>{
                if(err){
                    reject(err.message);
                } else{
                    conn.query(query, params, (error, data, fields) => {
                        conn.end();
                        if(error){
                            reject(error.message);
                        }
                        resolve(new QueryResult(true, data, 0, 0, ''));
                    })
                }
            });
        });
    }
    catch(error){
        console.log(error);
    }
}

/** 
 * @param {String} query
 * @param {Array} params
 * @returns {Object}
 */
async function insertData(query, params){
    try{
        console.log("Insert Data");
        const conn = await open();
        return new Promise(function (resolve, reject){
            conn.connect((err)=>{
                if(err){
                    reject(err.message);
                } else{
                    conn.query(query, params, (error, data, fields) => {
                        conn.end();
                        if(error){
                            reject(new QueryResult(false, null, 0, 0, error));
                        } else{
                            resolve(new QueryResult(true, data, data.insertId, data.affectedRows, ''));
                        }
                    })
                }
            });
        });
    }catch(error){
        console.log(error);
    }
}

/** 
 * @param {String} query
 * @param {Array} params
 * @returns {Object}
 */
async function bulkInsertData(query, elements){
    try{
        console.log("Bulk insert Data");
        const conn = await open();
        return new Promise(function (resolve, reject){
            conn.connect((err)=>{
                if(err){
                    reject(err.message);
                } else{
                    conn.query(query, elements, (error, data, fields)=>{
                    conn.end();
                    if(error){
                        reject(new QueryResult(false, null, 0, 0, error))
                    }else{
                        resolve(new QueryResult(true, data, data.insertId, data.affectedRows, ''));
                    }
                })
            }
            });
        });
    }catch(error){
        console.log(error);
    }
}

/**
 * @param {String} query
 * @param {Array} params
 * @returns {Object}
 */
async function updateData(query, params){
    try{
        console.log("Update Data");
        const conn = await open();
        return new Promise(function (resolve, reject) {
            conn.connect((err)=>{
                if (err){
                    reject(err.message);
                } else{
                    conn.query(query, params, (error, data, fields) =>{
                        conn.end();
                        if(error){
                            reject(new QueryResult(false, null, 0, 0, error))
                        }
                        else{
                            resolve(new QueryResult(true, data, 0, data.affectedRows, ''));
                        }
                    })
                }
            })
        })
    }catch(error)
    {
        console.log(error);
    }
}

module.exports = {QueryResult, getData, getDataWithParams, insertData, bulkInsertData, updateData}