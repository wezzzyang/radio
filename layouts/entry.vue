<template>
  <el-container class="entry">
    <el-main>
      <nuxt/>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data() {
    return {}
  },
  computed: {
    
  }
}
</script>
<style scoped>
html, body {
  height: 100%;
  font-family: 'Microsoft Yahei Light';
}
#__nuxt, #__layout {
  height: 100%;
}
.entry.el-container {
    height: 100%;
    background-color: #eee;
}
.el-main {
    display: flex;
    justify-content: center;
    align-content: center;
    height: 100%;
}

</style>
