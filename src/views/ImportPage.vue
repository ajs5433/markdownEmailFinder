<template>
  <div class="home">
    <Import />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Import from "@/components/Import.vue"; 
export default Vue.extend({
  name: "import",
  components: {
    Import
  }
});
</script>
