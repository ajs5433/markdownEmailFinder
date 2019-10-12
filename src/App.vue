<template>
  <div id="app">
    <div id="top">
      <el-header id="header">
        <div id="import-icon">
          <router-link to="/import">
            <el-button id="icon-upload" icon="el-icon-upload"></el-button>
          </router-link>
        </div>

        <div id="nav-bar">
          <router-link to="/">
            NOTIFICATIONS
          </router-link>

          <router-link to="/templates">
            TEMPLATES
          </router-link>
        </div>

        <div id="import-icon">
          <router-link to="/about">
            <el-button id="icon-info" icon="el-icon-info"></el-button>
          </router-link>
        </div>
      </el-header>
      <div id="search-bar">
        <el-input v-model="keyword" placeholder="Search Keyword"></el-input>

      </div>
    </div>
    <el-main id="main">
      <router-view />
    </el-main>

  </div>
</template>

<script>
import Papa from "papaparse";
import Tickets from "@/companyX/Tickets";
import { allTickets } from "@/companyX/AllTickets";

export default {
  computed: {
    keyword: {
      get() {
        return this.$store.state.keyword;
      },
      set(keyword) {
        this.$store.commit("setKeyword", keyword);
      }
    }
  },
  beforeCreate() {
    var tickets = Tickets.removeFaultyTickets(allTickets, false);
    Tickets.addProperties(tickets);
    this.$store.commit("addTickets", tickets);
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  border: none;
  margin: 0;
  padding: 0;
  width: 100%;
  box-sizing: border-box;
}

#header {
  color: white;
  text-align: center;
  height: 80px;
  display: flex;
  align-items: center;
  font-size: 20px;
  background-color: #243238;
  border-bottom: 2px solid lightgray;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 600px;
}

#import-icon {
  flex: auto 0 0;
  padding: 5px;
}

#nav-bar {
  flex: auto 1 1;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  align-self: flex-end;
  padding: 8px;
}

#nav-bar > * {
  color: #cfd8dc;
  margin: 0 8px;
  text-decoration: none;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 13px;
  font-family: "Libre Franklin", sans-serif;

  border: 1px solid #2c3e50;
}

#nav-bar > *:hover {
  color: white;
  border: 1px solid white;
}

#icon-upload {
  color: white;
  background-color: #2c3e50;
  font-size: 23px;
  padding: 9px 15px;
}

#icon-upload:hover {
  color: #2c3e50;
  background-color: white;
}

#icon-info {
  color: transparent;
  background-color: transparent;
  border-color: transparent;
  font-size: 23px;
  padding: 9px 15px;
}

#icon-info:hover {
  color: white;
  background-color: #2c3e50;
  border: 2px solid white;
}

#search-bar {
  padding: 0 20%;
  margin: 35px;
  z-index: 10;
}

#top {
  top: 0;
  position: fixed;
  width: 100%;
  background: linear-gradient(red 75%, yellow);
  background: linear-gradient(
    rgb(256, 256, 256, 1) 75%,
    rgb(256, 256, 256, 0.9)
  );
  z-index: 10000;
}

#main {
  margin-top: 150px;
  padding: 80px;
}
</style>
