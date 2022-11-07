import express from "express";
import { hello } from "../controllers/hello";

//라우터 변수 설정
const router = express.Router();

// Method: GET
// 경로: "/"
// 실행 할 함수: hello();
router.get("/", hello);

export default router;
