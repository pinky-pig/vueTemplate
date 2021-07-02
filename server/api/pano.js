/*
 * @Date: 2021-07-02 08:45:36
 * @LastEditors: wangwenbo
 * @LastEditTime: 2021-07-02 11:13:04
 * @FilePath: \vuetemplate\server\api\pano.js
 */
const express = require('express')
const router = express.Router()
const fs = require('fs')
const http=require('http');

router.get('/getTourXml', function (req, res) {
  //读取xml文件
  // http.get('http://127.0.0.1:8998/vtour/tour.xml', function (req,res) {
  //   console.log(res);
  // })
  res.send('66')
})
module.exports = router
