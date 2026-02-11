import dotenv from "dotenv";
import express, {NextFunction, Request, Response} from "express";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen( PORT, () => {
    console.log( `Server is running on port ${process.env.PORT}` );
} );