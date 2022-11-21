import express from "express";
import { JoinUser } from "../controllers/user";
import { loginUser } from "../controllers/user";

const router = express.Router();

router.post("/join", JoinUser);
router.post("/login", loginUser);

export default router;
