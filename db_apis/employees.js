const database = require('../services/database.js');
const oracledb = require('oracledb');


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


  const createSql = 
    'insert into employee_master (ecode, ename, fname, apdat) values (:ecode, :ename, :fname, :apdat';

  async function create(emp) {
    const employee = Object.assign({}, emp);

    employee.ecode = {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER
    }

    const result = await database.simpleExecute(createSql, employee);

    employee.ecode = result.outBinds.ecode[0];

    return employee;
  }

  module.exports.create = create;

  const updateSql = 'update employee_master set ename = :ename, fname = :fname, apdat = :apdat where ecode = :ecode';

  async function update(emp) {
    const employee = Object.assign({}, emp);
    const result = await database.simpleExecute(updateSql, employee);

    if (result.rowsAffected && result.rowsAffected === 1) {
      return employee;
    } else {
      return null;
    }
  }

  module.exports.update = update;

  const deleteSql = 
    ` delete from employee_master where ecode = :ecode;

      :rowcount := sql%rowcount;
    `;

  async function del (id) {
    const binds = {
      ecode: id,
      rowcount: {
        dir: oracledb.BIND_OUT,
        type: oracledb.NUMBER
      } 
    }

    const result = await database.simpleExecute(deleteSql, binds);

    return result.outBinds.rowcount === 1;
  }

module.exports.delete = del;