## 思路
  1. 使用koa框架搭建服务器
  2. 使用koa-router进行路由匹配操作数据库
  3. 使用koa2-cors实现跨域
  4. 使用koa-bodyparser解析请求体数据
  5. 使用sequelize抽象数据库，使数据库具备通用性
  **注:** 使用前安装koa koa-router koa2-cors及mysql(npm i ...)
## 遇到的问题
  1. 在查询所有订单的时候报了一个错误
  2. 跨终端请求数据产生跨域
  3. 无法获取请求体
  4. try catch减少多级嵌套
  5. exception hanlding的使用
  6. put和post方法(幂等意思)
  7. sequelize定义数据模型时报错
## 解决方法
  1. 在创建订单表的时候使用了order作为表名，order与查询语句的关键字冲突导致错误，更换表名解决
  2. 使用koa2-cors解决
  3. 使用koa-bodyparser中间件(可以解析通过post来传递的表单，json数据，或者上传文件)
  7. 在定义数据模型时，需要使用define第三个参数 {timestamps: false}，取消时间戳
  8. 测试