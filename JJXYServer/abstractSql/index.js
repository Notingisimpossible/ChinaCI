const findCJSql = (value) => {
  let sql = value.time ? `select * from  XYC_V_TJX_CJXX where id='${value.id}' and XQ='${value.time}'`:`select * from  XYC_V_TJX_CJXX where id='${value.id}'`
  return sql
}
const findKCBSql = (value) => {
  let sql = '****'
  return sql
}
const findCardSql = (value) => {
  let sql = '***'
  return sql
}
module.exports = {
  findCJSql,
  findKCBSql,
  findCardSql
} 