const express = require('express')
const router = express.Router()
const User = require('../entity/user')

// 查询
router.post('/query', (req, res, next) => {
  User.find().then(users => {
    res.json({
      success: true,
      message: '查询成功',
      total:10,
      data:users
    })
  }).catch(err => {
    res.json({
      success: false,
      message: '查询失败',
    })
  })
})
// 新增
router.post('/add', (req, res, next) => {
  const { _id, _name, _phone } = req.body
  User.create({_id:_id, _name:_name, _phone:_phone}, function(error,doc){
    if(error) {
      res.json({
        success: false,
        message: '添加失败',
        error:error
      })
    } else {
      res.json({
        success: true,
        message:'添加成功'
      })
    }
  });
})
// 删除
router.post('/del', (req, res, next) => {
  const { _id, _name, _phone } = req.body
  User.remove({ _id: _id }, { $set: { _name: _name } } , function (err) {
    if (err) { // 错误
      res.json({
        success: true,
        message: '删除失败',
        error:error
      })
    } else { // 正确
      res.json({
        success: true,
        message: '删除成功',
      })
    }
  });
})

module.exports = router
