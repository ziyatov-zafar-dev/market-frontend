<template>
  <div id="app">
    <el-container>
      <el-header style="color: #ffffff">
        <Header/>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Aside/>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

import Header from "@/layout/header.vue";
import Aside from "@/layout/Aside.vue";

export default {
  name: 'App',
  components: {Aside, Header}
}

</script>

<style>

#app {
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #1f2937; /* Dark Gray */
}

/* Zamonaviy gradient header */
.el-header, .el-footer {
  background: linear-gradient(90deg, #1e3a8a, #25ebc7); /* Indigo to Blue */
  color: #ffffff;
  text-align: center;
  line-height: 60px;
  font-weight: bold;
  font-size: 18px;
}

/* Aside: Soft blue-gray */
.el-aside {
  background-color: #ffffff; /* Light slate */
  color: #334155;            /* Slate text */
  text-align: center;
  line-height: 200px;
}

/* Main: Clean white with slight tint */
.el-main {
  background-color: #ffffff;
  color: #1e293b; /* Dark slate */
  text-align: center;
  /*line-height: 160px;*/
}

body > .el-container {
  margin-bottom: 40px;
}

/* Line height adjustments for larger layouts (optional) */
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
