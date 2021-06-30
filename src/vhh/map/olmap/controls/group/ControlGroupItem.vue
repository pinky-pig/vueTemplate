<template>
<div :class="[
    $style.controlGroupItem,
    $parent.isStacked ? $style.v : $style.h,
    (active && !activeClass) ? $style.active : ''
  ]"
  class="flex items-center justify-center relative w-11 h-11 cursor-pointer"
  @click="onClick">
  <slot :active="active"></slot>
</div>
</template>

<script>
/**
 * TODO: exclusive & stateful
 */
export default {
  name: 'ControlGroupItem',
  data() {
    return {
      active: false,
      name_ : this.name
    }
  },
  props: {
    // initial name_'s value
    name: String,
    stateful: Boolean,
    // 排它状态, 该值相同的 item 激活状态 相互排斥
    exclusive: [Boolean, String],

    // 自定义 active 状态样式 - 取代默认
    activeClass: String
  },
  mounted() {
    this.$parent.addItem(this)
  },
  methods: {
    onClick() {
      if(this.stateful) {
        // this.active = !this.active
        this.$parent.toggleItemStates(this)
      }
      // required! (Toolbar)
      this.$emit('click', this.active)
    }
  },
  components: {
  }
}
</script>

<style lang="postcss" module>
.controlGroupItem {
  @apply bg-white text-primary;
  &:before {
    content: "";
    display: block;
    position: absolute;
  }
  &:first-child:before {
    display: none;
  }
}

.active {
  @apply bg-primary text-white;

  &.h {
    &:before {
      border-left: 1px solid theme(colors.primary);
    }
  }

  &.v {
    &:before {
      border-top: 1px solid theme(colors.primary);
    }
  }
}

.h {
  &:before {
    left: 0;
    top: 8px;
    bottom: 8px;
    border-left: 1px solid #ddd;
  }
}

.v {
  &:before {
    top: 0;
    left: 8px;
    right: 8px;
    border-top: 1px solid #ddd;
  }
}
</style>
