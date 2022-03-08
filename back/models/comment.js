module.exports = (sequelize, DataTyepes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      content: {
        type: DataTyepes.TEXT, //매우긴글
        allowNull: false //필수
      }
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci" //한글 적용(mb4:이모티콘 허용)
    }
  )
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User) //UserId 추가됨
    db.Comment.belongsTo(db.Post)
  }
  return Comment
}
