const defaultOptions = {
  page: 1,
  size: 5,
  total: 0
}

function createPagination(options) {
  return {
    data() {
      return {
        pagination: {...defaultOptions, ...options}
      }
    },

    watch: {
      // Note: when mutating (rather than replacing) an Object or an Array, the old value will be the same as new value because they reference the same Object/Array. Vue doesn’t keep a copy of the pre-mutate value.
      pagination: {
        deep: true,
        handler(value, old) {
          // 非 pagination 替换 (如: pagination.page = ...)
          if(value === old) {
            this.onPaginate(value.page)
          }else if(!(value.page === old.page
            && value.size === old.size)) {
              this.onPaginate(value.page)
          }
        }
      }
    },
    methods: {
      onPaginate(page) {
        throw new Error('unimplemented')
      },
      setPagination(pageInfo) {
        this.pagination = {...this.pagination, ...pageInfo}
      },
      resetPagination() {
        this.pagination.page = 1
      }
    }
  }
}

export default createPagination()

export {createPagination}
