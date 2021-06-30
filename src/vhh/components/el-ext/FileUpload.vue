<template>
<div :class="$style.fileUpload">
  <el-upload
    :file-list="fileList"
    :http-request="httpRequest"
    :disabled="uploading || !!fileList.length"
    :accept="accept"
    :limit="1"
    v-loading="uploading"
    action=""
    drag>
    <slot>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </slot>
    <template v-slot:tip>
      <slot name="tip">
        <div class="el-upload__tip" slot="tip">支持文件类型: xls,xlsx</div>
      </slot>
    </template>
  </el-upload>
</div>
</template>

<script>
/**
 * elementui 扩展组件: (单)文件上传
 *
 * - 自定义 upload 逻辑
 */
export default {
  data() {
    return {
      fileList: [],
      uploading: false
    }
  },
  props: {
    // isImage: Boolean,
    upload: {
      type: Function,
      default: (uploadInfo) => {}
    },
    accept: String
  },
  methods: {
    async httpRequest(uploadInfo) {
      if(this.uploading) {
        return
      }
      try {
        this.fileList.push({name: uploadInfo.file.name, status: 'ready'})
        this.uploading = true
        await this.upload(uploadInfo)
        this.uploading = false
        this.fileList.forEach(item => item.status = 'success')
      } catch(e) {
        this.reset()
        console.log(e)
      }
    },
    reset() {
      this.uploading = false
      this.fileList = []
    },
  },
  components: {
  }
}
</script>

<style lang="postcss" module>
.fileUpload {
  :global{
    .el-upload-dragger {
      width: 240px;
      height: 154px;
    }
  }
}
</style>
