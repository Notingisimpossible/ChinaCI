const moment = require('moment')

moment.locale('zh-cn')
const getNowDate = () => {
  let today = moment().format('YYYY-MM-DD HH:mm:ss')
  return today
}
module.exports = {
  getNowDate
}
