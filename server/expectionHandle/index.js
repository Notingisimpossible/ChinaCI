const success = (msg) => {
  return {
    code: 200,
    message: msg
  }
}
const faild = (msg) => {
  return {
    code: 406,
    message: msg
  }
}
const existenceId = (err) => {
  return {
    code: 400,
    Error: err
  }
}
const invalidId = () => {
  return {
    code: 204,
    message: "无效的id"
  }
}
const catchError = (err) => {
  return {
    code: 0,
    Error: err
  }
}
module.exports = {
  success,
  existenceId,
  faild,
  invalidId,
  catchError
}