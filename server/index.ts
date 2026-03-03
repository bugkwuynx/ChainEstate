import dotenv from "dotenv";
import express from "express";
import type {NextFunction, Request, Response} from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import type {IncomingMessage, ServerResponse} from "http";

dotenv.config();

import authRouter from "./routes/auth/auth.router.js";
import propertiesRouter from "./routes/properties/properties.router.js";
import listingsRouter from "./routes/listings/listings.router.js";

export const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).send("Unauthorized");
    }
    jwt.verify(token, process.env.JWT_SECRET!, (error, user) => {
        if (error) {
            return res.status(403).send(error.message);
        }
        (req as any).user = user;
        next();
    });
}

app.use("/auth", authRouter);
app.use("/properties", authenticateJWT, propertiesRouter);
app.use("/listings", authenticateJWT, listingsRouter);

app.get("/protected", authenticateJWT, (req, res) => {
    res.send("This is a protected route!");
});

app.listen( PORT, () => {
    console.log( `Server is running on port ${process.env.PORT}` );
} );
