<template>
  <div id="app">
    <div id="nav">
      <el-container>
        <el-header height="100px"> Bienvo</el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container> 
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </div>
  </div>
</template>

<style scope>

.el-header {
    background-color: black;
    color: white;
    text-align: center;
    line-height: 100px;
    /* border: 3px solid gray; */
    font-size:20px;
  }

  .el-container{
    /* border: 1px solid blue; */
  }

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 600px;
}
/* #nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
