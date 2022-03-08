//중복되는 로직은 미들웨어로 뺴준다
// exports === {
//   isLoggedIn: (req,res, next) => {}
// }
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  return res.status(401).send("로그인이 필요합니다.")
}

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next()
  }
  return res.status(401).send("로그인한 사람은 사용할수 없는 페이지 입니다.")
}
