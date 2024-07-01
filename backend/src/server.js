import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import session from 'express-session';
import { auth } from './routes/auth.js';
import { account } from './routes/account.js';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

app.use('/api/auth', auth);
app.use('/api/account', account);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
