module.exports = (sequelize, DataTyepes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTyepes.STRING(40), //40자 이내
        allowNull: false, //필수
        unique: true //중복금지
      },
      nickname: {
        type: DataTyepes.STRING(20),
        allowNull: false
      },
      password: {
        type: DataTyepes.STRING(100),
        allowNull: false
      }
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci" //한글 적용
    }
  )
  User.associate = (db) => {
    db.User.hasMany(db.Post)
    db.User.hasMany(db.Comment)
  }
  return User
}
