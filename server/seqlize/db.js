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
// 测试连接是否成功
sequelize
  .authenticate()
  .then(() => {
    console.log('数据库连接成功')
  })
  .catch(err => {
    console.error('无法连接到数据库', err)
  })
module.exports = {
  sequelize
}