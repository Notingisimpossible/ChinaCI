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
      await oracledb.getConnection(config, async (err, conn) => {
        if(err){
          console.log(err)
        }else{
          await conn.execute(sql,value,(err,result) => {
            if(err){
              console.log(err)
            }else if(result.rows.length != 0){
              resolve(BeginOBJ(result))
            }else{
              reject("查询信息有误")
            }
          })
        }
      })
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

// 将结果转化为对象
const BeginOBJ = (res) => {
  console.log(res)
  let i = 0
  let result = res.metaData.reduce((lastItem,item) => {
    lastItem[item.name] = res.rows[0][i++]
    return lastItem
  },{})
  return result
}
module.exports = execute