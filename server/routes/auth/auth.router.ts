import {Router} from "express";
import { login, getNonce } from "../../controllers/auth/auth.controller";

const authRouter = Router();

authRouter.post("/login", login);

authRouter.get('/nonce', getNonce);

export default authRouter;