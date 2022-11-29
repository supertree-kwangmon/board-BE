import express from "express";

import { postBoard, getBoardList } from "../controllers/board";
import { loginCheck } from "../middlewares/auth";

const router = express.Router();

router.use("/", loginCheck);
router.post("/", postBoard);

router.get("/list", loginCheck, getBoardList);

export default router;
