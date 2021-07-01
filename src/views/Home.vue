<template>
  <div :class="$style.home" class=" bg-gray-200 m-auto flex flex-col p-3 space-y-4">
    <div class=" bg-white w-full h-96 p-3 rounded-lg" >
      <Simplebar>
        <el-table
          v-show="flag"
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
              <el-button
              type="text"
              >查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- <el-pagination
          v-show="flag"
          background
          style="margin:0 5px;"
          prev-text="上一页"
          next-text="下一页"
          layout="prev, pager, next"
          :current-page.sync="pagination.page"
          :page-size.sync="pagination.size"
          :total="pagination.total">
        </el-pagination> -->
        <Vtour v-show='!flag' style="width:552px;height:332px"></Vtour>
      </Simplebar>
    </div>
    <div class=" w-full h-28 bg-gray-100 p-3 rounded-lg space-x-3">
      <button @click="handleAdd" class=" rounded-md w-16 h-8 text-white bg-green-300 hover:bg-green-200 focus:bg-green-700">
      新增
      </button>
      <button @click="handleQuery" class=" rounded-md w-16 h-8 text-white bg-green-300 hover:bg-green-200 focus:bg-green-700">
      查询
      </button>
      <button @click="handleSwitch" class=" rounded-md w-16 h-8 text-white bg-green-300 hover:bg-green-200 focus:bg-green-700">
      切换
      </button>
    </div>
  </div>
</template>

<script>
import Vtour from '@/components/krpano/Vtour'
import { createPagination } from 'vhh/mixins/pageable'
import qs from 'qs'
export default {
  name: 'Home',
  mixins: [createPagination({size: 5})],
  components: {
    Vtour
  },
  data() {
    return {
      flag:true,
      value:'',
      tableData:[]
    }
  },
  methods: {
    async handleQuery(){
      let params = {
        pagenum: this.pagination.page,
        pagesize: this.pagination.size,
      }

      let { data,pageMetadata } = await this.$request.post('/query',qs.stringify(params))
      this.setPagination(pageMetadata)
      this.tableData = data
    },
    async onPaginate() {
      await this.handleQuery()
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
    async handleSwitch(){
      this.flag = !this.flag
    },
  },
}
</script>
<style lang="postcss" module>
.home{
  width: 600px;
  height: 500px;
  margin-top: 50px;
  border-radius: 10px;
  background: #f3f2f2;
  box-shadow:  20px 20px 60px #cfcece,
              -20px -20px 60px #ffffff;
}
</style>
