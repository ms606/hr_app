const database = require('../services/database.js');
const oracledb = require('oracledb');


const baseQuery = 
 `select ecode "ecode",
         ename "ename"
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

// ------------------------------------------
  const createSql = 
    `insert into employee_master (
        ecode, 
        ename
      ) values (
        4981, 
        :ename
      ) `;

  async function create(emp) {

    // await database.makeQuery();
    // return null;

    const employee = Object.assign({}, emp);

     console.log(emp);
     console.log('message0.1',createSql);
     console.log('message0',employee);

    employee.ename  = {
      val: 'Test Name',
       dir: oracledb.BIND_INOUT,
    }
    console.log('message1',employee);    

    const result = await database.simpleExecute(createSql, employee.ename);

    employee.ecode = result.outBinds.employee.ecode[0];

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