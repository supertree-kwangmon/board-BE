import User from "../models/user";

export const JoinUser = async (req, res) => {
  try {
    const { email, password, name, age } = req.body;

    console.log(email, password, name, age);

    const data = new User({
      email,
      password,
      salt: "123",
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
      data: req.body,
    });
  } catch (e) {
    res.send({
      success: false,
      message: e.message,
      data: null,
    });
  }
};
