/*
 * @Date: 2021-07-04 00:23:02
 * @LastEditors: wangwenbo
 * @LastEditTime: 2021-07-04 00:41:33
 * @FilePath: \vueTemplate\server\api\login.js
 */
const express = require('express')
const router = express.Router()
router.post('/login', function (req, res) {
  let { account, password } = req.body
  if (account === 'admin' && password === 'admin') {
    res.json({
      success: true,
      message: '登录成功',
    })
  } else {
    res.json({
      success: false,
      message: '登录失败',
    })
  }
})
module.exports = router