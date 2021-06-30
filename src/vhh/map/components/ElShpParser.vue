<template>
<div :class="$style.elShpParser">
  <el-upload
    v-loading="uploading"
    drag
    action=""
    multiple
    accept=".shp,.dbf"
    :file-list="fileList"
    :http-request="uploadShape"
  >
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">{{actionText}}</div>
    <div class="el-upload__tip" slot="tip">必须同时提供 shp 和 dbf 文件</div>
  </el-upload>
</div>
</template>

<script>
import {readShp} from '../utils/shp'

export default {
  name: 'el-shp-parser',
  data() {
    return {
      uploading: false,
      fileList: [],
      selectedFiles: [],
    }
  },
  props: {
    actionText: {
      type: String,
      default: '上传 shp 数据'
    },
    fileErrorPrompt: {
      type: Function,
      default(checkResult) {
        const msgs = [0, '请提供 shp 文件', '请提供 dbf 文件']
        this.$message.error(msgs[checkResult])
      }
    },
    encoding: {
      type: String,
      default: 'gbk'
    },
    readRecordCallback: {
      type: Function,
      default: (record) => {
        console.log('default readRecordCallback => ', record)
      }
    }
  },
  computed: {
    shapefiles() {
      if(!this.selectedFiles || this.selectedFiles.length === 0) {
        return {}
      }
      // ext <=> file
      let keyByExt = this.selectedFiles.reduce((acc, cur) => Object.assign(acc, {[this.getExtName(cur.name)]: cur}), {})
      return {
        shp: keyByExt['shp'],
        dbf: keyByExt['dbf'],
      }
    }
  },
  methods: {
    uploadShape(info) {
      if(this.uploading) {
        return
      }
      this.fileList.push({name: info.file.name, status: 'ready'})
      this.selectedFiles.push(info.file)

      // 延迟处理上传 (多文件准备好后)
      setTimeout(() => {
        if(this.uploading === false) {
          let checkResult = this.checkFiles()
          if(checkResult !== true) {
            this.fileErrorPrompt(checkResult)
            this.reset()
            return
          }

          this.readAsArrayBuffer([
            this.shapefiles['shp'],
            this.shapefiles['dbf']
          ]).then(([shp, dbf]) => {
            return readShp(shp, dbf, {
              encoding: this.encoding,
              callback: this.readRecordCallback
            })
            .then(() => this.$emit('success'))
            .catch(e => this.$emit('error', e))
            .finally(() => {
              this.reset()
            })
          })
        }
        this.uploading = true
      })
    },
    // 1: 缺少 shp 文件, 2: 缺少 dbf 文件
    checkFiles() {
      if(!this.shapefiles['shp']) {
        return 1
      }
      if(!this.shapefiles['dbf']) {
        return 2
      }
      return true
    },
    reset() {
      this.uploading = false
      this.fileList = []
      this.selectedFiles = []
    },
    // 扩展名
    getExtName(filename) {
      return filename.split('.').pop()
    },
    readAsArrayBuffer(file) {
      if(Array.isArray(file)) {
        return Promise.all(file.map(item => this.readAsArrayBuffer(item)))
      }
      return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.onload = (e) => {
          resolve(e.target.result)
        }
        reader.readAsArrayBuffer(file)
      })
    }
  },
  components: {
  }
}
</script>

<style lang="postcss" module>
.elShpParser {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
