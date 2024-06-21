import express from 'express';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import { ValidationError } from 'express-json-validator-middleware';
import pkg from 'pg';

const { Pool } = pkg;

const pool = new Pool({
  user: 'borko',
  host: 'database',
  database: 'tweeter',
  password: 'borko',
  port: 5432,
});

const { PORT = 4000, SERVER = `http://localhost:${PORT}` } = process.env;
const app = express();

app.use(fileUpload());

app.use(morgan("combined"));

app.use(express.json());

app.use((error, req, res, next) => {
  if (error instanceof ValidationError) {
    res.status(400).send(error.validationErrors);
    next();
  } else {
    next(error);
  }
});

app.listen(PORT, () => {
  console.log(`Running on ${SERVER}`);
});

export { pool };
