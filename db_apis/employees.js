const database = require('../services/database.js');

const baseQuery = 
 `select ecode "ID",
         ename "first_name",
         fname "father name",
         apdat "appointment date"
  from employee_master`;

  async function find(context) {
    let query = baseQuery;
    const binds = {};
  
    if (context.id) {
      binds.ecode = context.id;
  
      query += `\nwhere ecode = :ecode`;
    }
  
    const result = await database.simpleExecute(query, binds);
  
    return result.rows;
  }
  
  module.exports.find = find;