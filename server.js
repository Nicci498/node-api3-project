const express = require('express');

const server = express();
server.use(express.json());

const userRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter.js');


// for URLs beginning with /api/users
server.use("/api/users", logger, userRouter);

// for URLs beginning with /api/posts
server.use("/api/posts", logger, postRouter);

server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`Someone set a ${req.method} request to ${req.url} at [${new Date().toISOString()}]`) //is there a way to diferentiate the user/post's '/'???

  next();
}

module.exports = server;


