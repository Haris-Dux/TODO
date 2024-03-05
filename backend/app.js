import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import path from 'path';
import { config } from "dotenv";
import express from 'express';
import cors from "cors";
import userRouter from './routes/userRoutes.js';
import goalRouter from './routes/goalsRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

export const app = express();

config({
    path: "./data/config.env"
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());


app.use('/api/v1/auth', userRouter);
app.use('/api/v1/goals', goalRouter);


const root = path.resolve();
app.use(express.static(path.join(root, 'dist')));

app.get("*", (req, res) => {
  res.sendFile(path.join(root, 'dist/index.html'));
});


app.use(errorHandler);



