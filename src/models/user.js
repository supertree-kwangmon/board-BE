import mongoose from "mongoose";

const Schema = mongoose.Schema;

// PK, FK
// PK => Primary Key => 절대 노 중복 유일무이한 값
// FK => F Key => 외래 키 => 다른 테이블의 PK 값

// ORM => Object Relation Model?
// TypeORM, Sequelize
// Mongoose => Sequelize
// Sequelize => JS, TS
// TypeORM => TS

const userSchema = new Schema({
  id: mongoose.Schema.Types.ObjectId, // PK
  email: { type: String, required: true, match: /.+\@.+\..+/, unique: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: String, default: null },
  created_at: { type: Date, default: Date.now }, //일반적으로 Timestamp
});

module.exports = mongoose.model("users", userSchema);
