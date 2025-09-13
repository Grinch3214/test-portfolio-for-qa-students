import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes/index.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(cors());
app.use(
  cors({
    origin: 'http://localhost:5173',
    // origin: '*',
    credentials: true,
  })
);

app.use(router);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
