import Board from "../models/board";

export const postBoard = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { user } = res.locals;

    const data = new Board({
      userId: user._id,
      writer: user.name,
      title,
      content,
    });

    await data.save();

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
