import User from "../models/user";
import { createHashedPassword, verifyPassword } from "../lib/auth";
import jwt from "jsonwebtoken";

export const JoinUser = async (req, res) => {
  try {
    const { email, password, name, age } = req.body;

    console.log(email, password, name, age);

    const checkEmail = await User.findOne({ email });

    if (checkEmail) throw new Error("email already exists");

    // NPM 모듈에서 암호화 해주는 녀석 : Bcrypt

    const { hashedPassword, salt } = await createHashedPassword(password);

    const data = new User({
      email,
      password: hashedPassword,
      salt,
      name,
      age,
    });

    await data.save(); // User Schema Insert하는 과정

    //RDB
    //SELECT => 조회
    //INSERT => 삽입
    //UPDATE => 수정
    //DELETE => 삭제

    res.send({
      success: true,
      message: null,
      data,
    });
  } catch (e) {
    res.send({
      success: false,
      message: e.message,
      data: null,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 존재하는 유저인지 쳌
    const user = await User.findOne({ email });
    if (!user) throw new Error("user not found");

    // 비밀번호 쳌
    const verified = await verifyPassword(password, user.salt, user.password);
    if (!verified) throw new Error("password dose not match");

    // 토큰 발행 (JWT)
    // JWT, Passport

    const payload = {
      email: user.email,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: "1d",
    });

    res.send({
      success: true,
      message: null,
      data: {
        accessToken,
      },
    });
  } catch (e) {
    res.send({
      success: false,
      message: e.message,
      data: null,
    });
  }
};
