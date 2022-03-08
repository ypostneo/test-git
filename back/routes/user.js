const express = require("express")
const bcrypt = require("bcrypt")
const passport = require("passport")
const db = require("../models")
const { isLoggedIn, isNotLoggedIn } = require("./middlewares")

const router = express.Router()

router.post("/")

router.post("/", isNotLoggedIn, async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 12)
    const exUser = await db.User.findOne({
      //조건은 where안에 넣어준다.
      where: {
        email: req.body.email
      }
    })
    if (exUser) {
      //이미 회원가입이 되어 있으면, 403은 금지
      return res.status(403).json({
        errorCode: 1,
        message: "이미 회원가입이 되어 있습니다."
      })
    }
    const newUser = await db.User.create({
      email: req.body.email,
      password: hash,
      nickname: req.body.nickname
    })
    res.status(201).json(newUser)
  } catch (err) {
    console.log(err)
    next(err)
  }
})

router.post("/login", (req, res, next) => {
  // router.post("/login", isNotLoggedIn, (req, res, next) => {
  // req.body.email;
  // req.body.password;
  // // email, password 검사
  // await db.User.findOne();
  // // 세션에 저장
  // // 프론트에 쿠키 내려보내주기
  // user[cookie] = '유저정보';
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err)
      return next(err)
    }
    if (info) {
      return res.status(401).send(info.reason)
    }
    return req.login(user, async (err) => {
      //세션에 사용자 정보 저장 (어떻게: serializeUser)
      if (err) {
        console.error(err)
        return next(err)
      }
      return res.json(user)
    })
  })(req, res, next)
})

router.post("/logout", (req, res) => {
  if (req.isAuthenticated()) {
    req.logOut()
    req.session.destroy() //세션을 없애주기
    return res.status(200).send("로그아웃 되었습니다.")
  }
})

module.exports = router
