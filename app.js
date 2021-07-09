import express from 'express';
import cors from 'cors';
import postRouter from './router/post.js';
import authRouter from './router/auth.js';
import { config } from './config.js';
import { sequelize } from './db/database.js';

const app = express();


//middleware
app.use(express.json());
app.use(cors());


//router
app.use('/post', postRouter);
app.use('/auth', authRouter);


//last error handling
app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.sendStatus(500);
});

//connect to database, then start server
sequelize.sync()
  .then(app.listen(config.host.port));