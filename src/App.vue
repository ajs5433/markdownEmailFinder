<template>
  <div id="app">
    <div id="nav">
      <el-container>
          <el-header height="100px">
            <router-link to="/import">
              <el-button icon="el-icon-upload" ></el-button>
            </router-link>

            <router-link to="/">
            Notifications
            </router-link>

            <router-link to="/templates">
            Templates
            </router-link>

          </el-header>
          <div id="search-bar" >
            <!-- <el-row id="search-bar"> -->
            <el-input v-model="keyword" placeholder="Keyword"></el-input>
            <!-- <el-button icon="el-icon-refresh-left" size="small"> </el-button> -->
            <!-- <el-badge :value="filteredTicketsLength" class="item"> -->
            <!-- <el-button size="small">results</el-button> -->
            <!-- </el-badge> -->
            <!-- </el-row> -->
          </div>
        <el-main>
          <router-view />
        </el-main>
      </el-container> 
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </div>
  </div>
</template>

<script>
export default {
  computed:{
        keyword:{
            get(){
                return this.$store.state.keyword;
            },
            set(keyword){
                this.$store.commit('setKeyword',keyword)
            }
        }
    }
}
</script>

<style scoped>

.el-header {
    background-color: linear-gradient(141deg, #0fb8ad, #1fc8db 51%, #2cb5e8 75%);
    color: white;
    text-align: center;
    line-height: 100px;
    /* border: 3px solid gray; */
    font-size:20px;
  }

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 600px;
}

</style>
