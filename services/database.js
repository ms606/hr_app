const oracledb = require('oracledb');
const dbConfig = require('../config/database.js');

async function initialize(){
    const pool = await oracledb.createPool(dbConfig.hrPool);
};

module.exports.initialize = initialize;