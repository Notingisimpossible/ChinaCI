const sqlModel = require('./sqlModel')

// 获取全部用户
const getAllUser = async () => {
  let datas = await sqlModel.Users.findAll()
  return datas
}
//  通过id查找用户
const findUser = async (id) => {
  let datas = await sqlModel.Users.findAll({
   where: {
     id: id
   }
  })
  return datas
}
// 添加用户
const addUser = async (data) => {
  let model = {
    id: data[0],
    first_name: data[1],
    last_name: data[2],
    email: data[3]
  }
  let datas = await sqlModel.Users.create(model)
  return datas
}
// 删除用户
const deleteUser = async (id) => {
  let datas = await sqlModel.Users.destroy({
    where:{
      id:id
    }
  })
  return datas
}
// 修改用户
const changeUser = async (data,id) => {
  let model = {
    first_name: data[0],
    last_name: data[1],
    email: data[2]
  }
  let datas = await sqlModel.Users.update(
    model,{
      where: {
        id:id
      }
    }
  )
  return datas
}


// 获取全部订单
const getAllOrder = async () => {
  let data = await sqlModel.Orders.findAll()
  return data
}
// 通过id获取订单
const findOrder = async (id) => {
  let datas = await sqlModel.Orders.findAll({
   where: {
     id: id
   }
  })
  return datas
}
// 删除订单
const deleteOrder = async (id) => {
  let datas = await sqlModel.Orders.destroy({
    where:{
      id:id
    }
  })
  return datas
}
// 添加订单
const addOrder = async (data) => {
  let model = {
    id: data[0],
    order_date: data[1],
    purchaser: data[2],
    quantity: data[3],
    product_id: data[4]
  }
  let datas = await sqlModel.Users.create(model)
  return datas
}
// 修改订单
const changeOrder = async (data,id) => {
  let model = {
    order_date: data[0],
    purchaser: data[1],
    quantity: data[2],
    product_id: data[3]
  }
  let datas = await sqlModel.Orders.update(
    model,{
      where: {
        id:id
      }
    }
  )
  return datas
}


// 获取全部产品
const getAllProduct = async () => {
  let data = await sqlModel.Orders.findAll()
  return data
}
// 通过id获取产品
const findProduct = async (id) => {
  let datas = await sqlModel.Products.findAll({
   where: {
     id: id
   }
  })
  return datas
}
// 删除产品
const deleteProduct = async (id) => {
  let datas = await sqlModel.Products.destroy({
    where:{
      id:id
    }
  })
  return datas
}
// 添加产品
const addProduct = async (data) => {
  let model = {
    id: data[0],
    name: data[1],
    description: data[2],
    weight: data[3],
  }
  let datas = await sqlModel.Products.create(model)
  return datas
}
// 修改产品
const changeProduct = async (data,id) => {
  let model = {
    name: data[0],
    description: data[1],
    weight: data[2],
  }
  let datas = await sqlModel.Products.update(
    model,{
      where: {
        id:id
      }
    }
  )
  return datas
}
module.exports = {
  getAllUser,
  findUser,
  deleteUser,
  addUser,
  changeUser,
  getAllOrder,
  findOrder,
  deleteOrder,
  addOrder,
  changeOrder,
  getAllProduct,
  findProduct,
  deleteProduct,
  addProduct,
  changeProduct
}
