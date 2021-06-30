const express = require('express');
const mongoose = require('mongoose');

const DB_URL = 'mongodb://127.0.0.1:27017/mongodb';

// 解决waring信息(node:21708) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
mongoose.set('useCreateIndex', true)
// 解决waring信息(node:16308) DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated. See: https://mongoosejs.com/docs/deprecations.html#findandmodify
mongoose.set('useFindAndModify', false)

// 连接mongodb。后面两个参不加，会有waring信息
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', () => {
  console.log('mongo连接成功')

  //这里mongoose.Schema要写上第二个参数，明确指定到数据库中的哪个表取数据

  // 1.定义 Schema, 也就是传统意义的表结构
  let userSchema = new mongoose.Schema({
    // _name:{type: String, unique: true},//定义一个属性 name, 类型为 String,主键
    _name:String,
    _phone:Number
  },
  {collection: "test"}
  );
  // 2.定义 Model
  let UserModel = mongoose.model('mongodb', userSchema);

  // 3.定义测试数据
  let obj = new UserModel({ _name: 'wang', _phone: 111 });

  // 4.添加数据。方法1
  // let userEntity = new UserModel(obj)
  // userEntity.save(function(err, doc){
  //   if(err) console.log(err);
  //   else console.log(' saved');
  // });
  // 方法2
  // UserModel.create({ name:"model_create", age:26}, function(error,doc){
  //   if(error) {
  //       console.log(error);
  //   } else {
  //       console.log(doc);
  //   }
  // });

  // 5.修改数据
  // UserModel.findOneAndUpdate({ _phone: 111 }, { $set: { _name: 'aaa' } }, { multi: true }, function (err) {
  //   if (err) { // 错误
  //       console.log('update failed');
  //   } else { // 正确
  //       console.log('update success');
  //   }
  // });

  // 6.查询数据
  //查询一条
  let query = UserModel.findOne({ '_phone': 111 });
  query.select();
  query.exec(function (err, user) {
      if (err) {
        console.log('select failed');
      } else {
        console.log(user);
      }
  });
  //查询多条
  var query1 = UserModel.find({ '_phone': 111 });
  query1.select();
  query1.exec(function (err, user) {
      if (err) {
          console.log('select failed');
      } else {
          console.log(user);
      }
  });
  //链式查询
  // personModel //model 对象
  //   .find({ occupation: /host/ }) // 条件查询
  //   .where('name.last').equals('Ghost') //字段 = 值
  //   .where('age').gt(17).lt(66) // 范围
  //   .where('likes').in(['vaporizing', 'talking']) // 范围
  //   .limit(10) // 查几条
  //   .skip(20) // 跳过几条
  //   .asc('age') // 排序
  //   .sort('-occupation')
  //   .select('name occupation') // 执行查询 () 中的值可以省略, 只是别名
  //   .exec(callback); // 回调函数, 处理查询结果

  UserModel
  .where('_phone')
  .where('_name').equals('aaa')
  .limit(2)
  .select()
  .exec(function (err, user) {
      if (err) {
          console.log('select failed');
      } else {
          console.log(user);
      }
  });

  // 7.删除
  // UserModel.remove({ _phone: 111 }, { $set: { _name: 'aaa' } } , function (err) {
  //   if (err) { // 错误
  //       console.log('update failed');
  //   } else { // 正确
  //       console.log('update success');
  //   }
  // });



// > Schema、Model、Entity 的关系请牢记，Schema 生成 Model，Model 创造 Entity，Model 和 Entity 都可对数据库操作造成影响，但 Model 比 Entity 更具操作性。

// | **关系型数据库** | **mongodb** |
// | ---------------- | ----------- |
// | table            | collection  |
// | row              | document    |
// | column           | index       |
// | table joins      | populate    |
// | primary          | key _id     |

});
