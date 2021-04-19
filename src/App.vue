<template>
  <KowMap />
</template>
<script lang="ts">
import KowMap from '@/components/KowMap.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { KowMap }
})
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700');

* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html, body {
  padding: 0;
  margin: 0;
  background-color: var(--bs-gray-dark);
  color: var(--bs-light);
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
}
.container {
  display: flex;

  .panel {
    flex-grow: 1;
  }
}
</style>