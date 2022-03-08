module.exports = (sequelize, DataTyepes) => {
  const Post = sequelize.define(
    "Post",
    {
      //테이블명 posts
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
  Post.associate = (db) => {
    db.Post.belongsTo(db.User) //UserId 추가됨
    db.Post.hasMany(db.Comment)
    db.Post.hasMany(db.Image)
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" }) //다대다 관계
  }
  return Post
}
