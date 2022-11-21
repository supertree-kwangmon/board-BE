import User from "../models/user";

export const JoinUser = (req, res) => {
  try {
    res.send({
      success: true,
      message: null,
      data: "join user",
    });
  } catch (e) {
    res.send({
      success: false,
      message: e.message,
      data: null,
    });
  }
};
