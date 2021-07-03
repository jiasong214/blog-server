import express from 'express';
import cors from 'cors';


import postRouter from './router/post.js';
// import authRouter from './router/auth.js';

const app = express();


//middleware
app.use(express.json());
app.use(cors());


//router
app.use('/post', postRouter);
// app.use('/auth', authRouter);


//last error handling
app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.sendStatus(500);
});


//server
app.listen(8080);