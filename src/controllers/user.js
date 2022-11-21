import User from "../models/user";
import { createHashedPassword } from "../lib/auth";

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
