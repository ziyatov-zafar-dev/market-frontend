<template>
  <div style="text-align: right; font-size: 12px;">
    <el-dropdown>
      <i class="el-icon-setting" style="margin-right: 15px"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>View</el-dropdown-item>
        <el-dropdown-item v-if="!authenticated"><span>Kirish</span></el-dropdown-item>
        <el-dropdown-item v-if="authenticated"><span>Chiqish</span></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: `Header`,
  computed: {
    authenticated(){
      return this.$store.getters.authenticated;
    }
  }
}
</script>
<style scoped>

</style>