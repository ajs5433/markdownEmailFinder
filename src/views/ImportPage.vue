<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
    <Import/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Import from "@/components/Import.vue"; // @ is an alias to /src

export default Vue.extend({
  name: "import",
  components: {
    Import
  }
});
</script>
