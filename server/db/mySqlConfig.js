const mysql = require('mysql')
const config = require('./defaultConfig')

// 创建线程池
var pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  port: config.database.PORT
})

// 封装统一的数据库连接池
const service = {
  query: function(sql,value){
    return new Promise((resolve, reject) => {
      pool.getConnection((err,connection) => {
        if(err){
          reject(err)
        }else{
          connection.query(sql,value,(err,result) => {
            if(err){
              reject(err)
            }else{
              resolve(result)
            }
            connection.release()
          })
        }
      })
    })
  }
}

// 数据库操作方法

// 获取所有的用户信息
const getAllUser = () => {
  let _sql = "select * from users"
  return service.query(_sql)
}
// 删除用户
const deleteUser = (id) => {
  let _sql = `delete from users where id=${id}`
  return service.query(_sql)
}
// 添加用户
const addUser = (data) => {
  let _sql = `insert into users where id=?,first_name=?,last_name=?,email=?;`
  return service.query(_sql,data)
}

// 获取所有的产品信息
const getAllProduct = () => {
  let _sql = "select * from products"
  return service.query(_sql)
}
// 删除产品
const deleteProduct = (id) => {
  let _sql = `delete from user where id=${id}`
  return service.query(_sql)
}
// 添加产品
const addProduct = (data) => {
  let _sql = `insert into products where id=?,name=?,description=?,weight=?;`
  return service.query(_sql,data)
}

// 获取所有订单信息
const getAllOrder = () => {
  let _sql = "select * from orders"
  return service.query(_sql)
}
// 删除订单
const deleteOrder = () => {
  let _sql = `delete from orders where id=${id}`
  return service.query(_sql)
}
// 添加订单
const addOrder = (data) => {
  let _sql = "insert into orders where id=?,order_data=?,purchaser=?,quantity=?,product_id=?"
  return service.query(_sql, data)
} 

// 抛出方法
module.exports = {
  getAllUser,
  deleteUser,
  getAllProduct,
  deleteProduct,
  addProduct,
  getAllOrder,
  deleteOrder,
  addOrder
}
