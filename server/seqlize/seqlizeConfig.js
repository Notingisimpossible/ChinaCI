const Sequelize = require('sequelize');
const defaultConfig = require('./defaultConfig')


// 创建连接池
const sequelize = new Sequelize(defaultConfig.database.DATABASE, defaultConfig.database.USERNAME, defaultConfig.database.PASSWORD,{
  host: defaultConfig.database.HOST,
  port: defaultConfig.database.PORT,
  dialect: 'mysql',
  pool: { // 连接池设置
    max: 5, // 最大连接数
    min: 0, // 最小连接数
    idel: 10000
  },
  logging: false // 阻止sequelize输出到控制台
})

// 定义模型
// const getAllUser = sequelize.define('getUser', {
//   title: {
//     type: Sequelize.INTEGER,
//     primaryKey: true, // 主键
//     autoIncrement: true, // 自增
//     comment: '自增id' // 注释：只在代码中有效
//   },
//   title: {
//     type: Sequelize.STRING
//   },
//   body: {
//     type: Sequelize.STRING
//   }
// })
