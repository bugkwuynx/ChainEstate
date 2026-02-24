import {Router} from "express";
import { login, getNonce, loginTest } from "../../controllers/auth/auth.controller";

const authRouter = Router();

authRouter.post("/login", login);

authRouter.post("/login-test", loginTest);

authRouter.get('/nonce', getNonce);

export default authRouter;