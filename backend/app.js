import express from 'express';
import cors from 'cors';
import router from './routes/index.js';

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(router);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
