<template>
  <img @load="$emit('load', $el)" alt="KoW Map" src="@/assets/images/kow-map-no-city.png" />
</template>

<script lang="ts">
import '@/assets/images/kow-map-no-city.png'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MapImage',
  emits: [ 'load' ],
})
</script>