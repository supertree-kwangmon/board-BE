import jwt from "jsonwebtoken";
import User from "../models/user";

export const loginCheck = async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      throw new Error("authorization is required!");

    const token = req.headers.authorization.split("Bearer ")[1];
    if (!token) throw new Error("invalid token!");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) throw new Error("invalid signature!");

    const today = new Date().getTime();
    const exp = decoded.exp * 1000;

    if (today > exp) throw new Error("accessToken has expired!");

    res.locals.user = await User.findOne({ email: decoded.email });
    next();
  } catch (e) {
    res.send({
      success: false,
      message: e.message,
      data: null,
    });
  }
};
