const oracledb = require('oracledb')
const config = require('./defaultConfig')


// 封装连接池
// (async ()=>{
// 	try{
// 		await oracledb.createPool(config);
// 	     var connection =  await oracledb.getPool('Hello').getConnection();
// 	     var result = await connection.execute('select 123 from dual');
// 	     await connection.close();
// 	     console.log(result)
// 	}catch(err){
// 	    console.log(err.message)
// 	}
// })();


// // 封装查询器
const execute = (sql, value = [], opts = {}) => {
  return new Promise(async (resolve, reject) => {
    let conn,result
    try {
      conn = await oracledb.getConnection(config)
      result = await conn.execute(sql, value)
      resolve(result)
    } catch (error) {
      reject(error)
    }finally{
      if (conn) {
        try {
          await conn.close()
        } catch (error) {
          console.log(error)
        }
      }
    }
  })
}
module.exports = execute