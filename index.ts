import express,{ Request, Response,Express } from "express";
import dotenv from 'dotenv';
import { connectToMongoDB } from "./config/connection";
import walletRouter from './routes/index';
import cors from 'cors';
import errorHandler from "./middlewares/errorHandler";
dotenv.config();

const app:Express = express();
const port = process.env.PORT;

connectToMongoDB();
app.use(express.json())
app.use(cors());
app.use('/wallet',walletRouter);
app.use(errorHandler)

app.get('/', (req:Request, res:Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});