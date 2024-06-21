import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { auth } from './routes/auth.js';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

app.use('/api/auth', auth);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
