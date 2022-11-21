import express from "express";
import { JoinUser } from "../controllers/user";

const router = express.Router();

router.post("/join", JoinUser);

export default router;
