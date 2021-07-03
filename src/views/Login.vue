<!--
 * @Date: 2021-07-03 14:41:58
 * @LastEditors: wangwenbo
 * @LastEditTime: 2021-07-04 00:50:46
 * @FilePath: \vueTemplate\src\views\Login.vue
-->
<template>
  <div :class="$style.Login" class=" w-full h-full bg-primary-light-3 flex justify-center items-center">
    <!-- main登录页面 -->
    <div :class="$style.main" class=" w-4/5 h-4/5 flex flex-row overflow-hidden">
      <!-- 左侧全景图 -->
      <div class=" bg-gray-300 flex-auto" >
        <Vtour></Vtour>
      </div>
      <!-- 右侧登录表单 -->
      <div class=" w-96 h-full">

        <div class="min-h-full flex items-center justify-center bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
          <div class="max-w-md w-full space-y-8">
            <div>
              <img class="mx-auto h-24 w-auto" src="@/assets/logo.svg" alt="Workflow">
              <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                登录您的账户
              </h2>
              <p class="mt-2 text-center text-sm text-gray-600">
                Or
                <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                  注册
                </a>
              </p>
            </div>
            <form class="mt-8 space-y-6" action="#" method="POST">
              <input type="hidden" name="remember" value="true">
              <div class="rounded-md shadow-sm -space-y-px">
                <div>
                  <label for="account" class="sr-only" >Email address</label>
                  <input v-model="account" id="account" name="text" type="text" autocomplete="text" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Account">
                </div>
                <div>
                  <label for="password" class="sr-only">Password</label>
                  <input v-model="password" id="password" name="password" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password">
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
                  <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                    记住密码
                  </label>
                </div>

                <div class="text-sm">
                  <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                    忘记密码？
                  </a>
                </div>
              </div>

              <div>
                <el-button type="primary"  @click="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-xl font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg class="h-5 w-5 text-white group-hover:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                    </svg>
                  </span>
                  登录</el-button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import Vtour from '@/components/krpano/Vtour'
export default {
  name: 'vueName',
  components:{
    Vtour,
  },
  data () {
    return {
      account:'admin',
      password:''
    }
  },
  methods:{
    async submit(){
      if (this.account != '' && this.account != null && this.account != undefined) {
        if (this.password != '' && this.password != null && this.password != undefined) {
          let params = {
            account: this.account,
            password:this.password
          }
          let {data} = await this.$request.post('/login/login',params)
          if (data.success === true) {
            this.$message.success('登录成功')
            this.$router.push('pano')
          }else{
            this.$message.error('登录失败')
          }
        }
      }
    }
  }
}
</script>
<style lang="postcss" module>
.Login{
  .main{
    font-family: VT324;
    border-radius: 10px;
    background: #948BB3;
    box-shadow:  7px 7px 14px #57526a,
                -7px -7px 14px #d1c4fc;
  }
}
</style>