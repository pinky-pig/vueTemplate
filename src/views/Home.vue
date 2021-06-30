<template>
  <div :class="$style.home" class=" bg-gray-200 m-auto flex flex-col p-3 space-y-4">
    <div class=" bg-white w-full h-60 p-3 rounded-lg" >{{value}}
      <Simplebar>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column label="序号" type="index" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index+1}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="_id"
            label="id">
          </el-table-column>
          <el-table-column
            prop="_name"
            label="name">
          </el-table-column>
          <el-table-column
            prop="_phone"
            label="phone">
          </el-table-column>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
              type="text"
              @click="handleDel(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </Simplebar>
    </div>
    <div class=" w-full h-28 bg-gray-100 p-3 rounded-lg space-x-3">
      <button @click="handleAdd" class=" rounded-md w-16 h-8 text-white bg-green-300 hover:bg-green-200 focus:bg-green-700">
      新增
      </button>
      <button @click="handleQuery" class=" rounded-md w-16 h-8 text-white bg-green-300 hover:bg-green-200 focus:bg-green-700">
      查询
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      value:'',
      tableData:[]
    }
  },
  methods: {
    async handleQuery(){
      let {data} = await this.$request.get('/query')
      this.tableData = data
    },
    async handleAdd(){
      let params = {
        _id: new Date().getTime(),
        _name:'chun',
        _phone:'120'
      }
      let {data} = await this.$request.post('/add',params)
      if (data.success === true) {
        this.$message.success('添加成功')
      }else{
        this.$message.success('添加失败')
      }
      this.handleQuery()
    },
    async handleDel(row){
      let params = {
        _id: row._id,
        _name:row._name
      }
      let {data} = await this.$request.post('/del',params)
      if (data.success === true) {
        this.$message.success('删除成功')
      }else{
        this.$message.success('删除失败')
      }
      this.handleQuery()
    },
  },
}
</script>
<style lang="postcss" module>
.home{
  width: 600px;
  height: 400px;
  margin-top: 50px;
  border-radius: 10px;
  background: #f3f2f2;
  box-shadow:  20px 20px 60px #cfcece,
              -20px -20px 60px #ffffff;
}
</style>
