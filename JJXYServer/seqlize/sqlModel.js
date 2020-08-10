const db = require('./db')
const Sequelize = require('sequelize');
const { sequelize } = require('./db');

// 创建表模型
const Users = db.sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  first_name : Sequelize.STRING,
  last_name : Sequelize.STRING,
  email : Sequelize.STRING
}, {
  timestamps: false
});
// 订单模型
const Orders = db.sequelize.define('orders', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  order_date: Sequelize.DATE,
  purchaser: Sequelize.INTEGER,
  quantity: Sequelize.INTEGER,
  product_id: Sequelize.INTEGER
},{
  timestamps: false
})
// 商品模型
const Products = db.sequelize.define('products', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  weight: Sequelize.FLOAT
},{
  timestamps: false
})
// 抛出模型
module.exports = {
  Users,
  Orders,
  Products
}