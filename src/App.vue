<template>
  <div id="app">
    <!-- <div id="nav"> -->
      <!-- <el-container> -->
          <el-header id="header">
            <div id="import-icon">
              <!-- <el-tooltip class="item" effect="dark" content="Import more notifications" placement="bottom-end"> -->
                <router-link to="/import">
                  <el-button id="icon-upload" icon="el-icon-upload" ></el-button>
                </router-link>
              <!-- </el-tooltip> -->
            </div>

            <div id="nav-bar">
              <router-link to="/">
              NOTIFICATIONS
              </router-link>

              <router-link to="/templates">
              TEMPLATES
              </router-link>
            </div>
            
          </el-header>
          <div id="search-bar" >
            <!-- <el-row id="search-bar"> -->
            <el-input v-model="keyword" placeholder="Search Keyword"></el-input>
            <!-- <el-button icon="el-icon-refresh-left" size="small"> </el-button> -->
            <!-- <el-badge :value="filteredTicketsLength" class="item"> -->
            <!-- <el-button size="small">results</el-button> -->
            <!-- </el-badge> -->
            <!-- </el-row> -->
          </div>
        <el-main>
          <router-view />
        </el-main>
      <!-- </el-container>  -->
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    <!-- </div> -->
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

<style>

*{
  box-sizing: border-box;
}

body{
  border: none;
  margin: 0;
  padding: 0;
  width:100%;
  box-sizing: border-box;
}

#header{
    background-color: linear-gradient(141deg, #0fb8ad, #1fc8db 51%, #2cb5e8 75%);
    color: white;
    text-align: center;
    height: 80px;
    display: flex;
    align-items: center;
    font-size:20px;
    background-color: #243238;
}

#app {
  /* font-family: "Avenir", Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 600px;
}

#import-icon{
  flex: auto 0 0;
  padding: 5px;
}

#nav-bar{
  flex: auto 1 1;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  align-self: flex-end;
  padding: 8px;
}

#nav-bar>*{
  color: #cfd8dc;
  margin: 0 8px;
  text-decoration: none;
  /* border: 1px solid red; */
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 13px;
  font-family: 'Libre Franklin', sans-serif;

  border: 1px solid #2c3e50;
}

#nav-bar>*:hover{
  color:white;
  border: 1px solid white;
}


#icon-upload{
  color: white;
  background-color: #2c3e50;
  font-size: 23px;
  padding: 9px 15px;
}

#icon-upload:hover{
  color: #2c3e50;
  background-color: white;
  /* border: 2px solid white; */
}

#search-bar{
  padding: 0 20%;
  margin: 35px;
  /* margin-bottom: 40px; */
}

</style>
