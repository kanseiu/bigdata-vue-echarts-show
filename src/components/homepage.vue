<template>
  <div class="container" :style="styleObject">
    技能大赛——数据可视化
  </div>
</template>

<script>
export default {
  name: 'AdaptiveText',
  data() {
    return {
      baseFontSize: 50, // 基础字号
      windowWidth: 0 // 窗口宽度
    }
  },
  computed: {
    styleObject() {
      return {
        fontSize: `${this.baseFontSize + this.windowWidth / 100}px`,
        fontWeight: 'bold'
      }
    }
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
    }
  },
  mounted() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}
</style>
