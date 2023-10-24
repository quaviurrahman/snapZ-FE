const index = require ("./public/index.html")
const topic = require ("./public/topic.html")
const post = require ("./public/post.html")
const dashboard = require ("./public/dashboard.html")

const express = require('express');
const app = express();

const port = process.env.PORT || 5000;


app.use("/",index);
app.use("/topic",topic);
app.use("/post",post);
app.use("/dashboard",dashboard);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });