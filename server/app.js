/*
 * @Date: 2021-06-23 21:00:37
 * @LastEditors: wangwenbo
 * @LastEditTime: 2021-07-02 08:26:42
 * @FilePath: \vuetemplate\server\app.js
 */
var express = require('express')
var app = express()
require('./db')
var userRoutes = require('./api/user')
const mongoose = require('mongoose')
const DB_URL = 'mongodb://127.0.0.1:27017/mongodb';
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// axios接口数据。axios数据请求方式x-www-form-urlencoded
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


//设置跨域访问
app.all("*",function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
    res.send(200);  //让options尝试请求快速结束
  else
    next();
})

app.use('/', userRoutes)

app.listen(3000, () => {
  console.log('express start port 3000');
})
