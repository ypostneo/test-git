const express = require("express")
const cors = require("cors")
const bcrypt = require("bcrypt")
const passport = require("passport")
const session = require("express-session")
const cookie = require("cookie-parser")
const morgan = require("morgan")

const db = require("./models")
const passportConfig = require("./passport")
const userRouter = require("./routes/user")
const postRouter = require("./routes/post")
const app = express()

// db.sequelize.sync();
db.sequelize.sync({ force: false }) //{force: true}는 서버를 재시작할때마다 데이터를 지운다.
passportConfig()

app.use(morgan("dev"))
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
)
app.use("/", express.static("uploads")) //프론트에서 백단 접근을 위한 미들웨어 설정
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookie("cookiesecret"))
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "cookiesecret",
    cookie: {
      httpOnly: true,
      secure: false
    }
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.get("/", (req, res) => {
  res.send("안녕 시퀄라이즈")
})

app.use("/user", userRouter)
app.use("/post", postRouter)

app.listen(3085, () => {
  console.log(`백엔드 서버 ${3085}번 포트에서 작동중.`)
})
