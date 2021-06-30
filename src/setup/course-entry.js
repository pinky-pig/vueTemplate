import router from '@/router'
import store from '@/store'

/**
 * 课程入口, 用户登录后, 必须选择课程, 否则强制跳转到选课页面
 */
const courseEntryPath = '/courses'

router.beforeEach((to, from , next) => {
  const authenticated = store.getters.authenticated
  const selectedCourse = store.state.course
  // 如果已登录且没选课程, 跳转到选课页面
  if(authenticated && !selectedCourse && to.path !== courseEntryPath) {
    next(courseEntryPath)
  } else {
    // 未认证状态 -> 清除已选课程
    if(!authenticated) {
      store.commit('selectCourse', null)
    }
    next()
  }
})
