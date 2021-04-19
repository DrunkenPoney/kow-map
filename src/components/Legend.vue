<template>
  <div class="legend-wrapper">
    <strong class="legend-title">Legend</strong>
    <div v-for="(cat, idx) in categories" :key="idx"
         class="legend">
      <div><span :style="{ color: colorOf(cat) }" v-html="blocks(1)" />:</div>
      <div v-text="cat.name" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import categories, { Category } from '@/modules/data/categories'
import { color } from '@/modules/utils/colors'

export default defineComponent({
  name: 'Legend',
  data() {
    return {
      categories: Object.values(categories),
    }
  },

  methods: {
    colorOf(cat: Category): string { return color(cat.color) },
    blocks(qty: number): string { return '&block;'.repeat(qty) },
  },
})
</script>

<style lang="scss" scoped>
.legend-wrapper {
  position: fixed;
  top: 1em;
  right: 1em;
  z-index: 9999;
  padding: 0.25em;
  font-size: 10px;

  border: 2px solid var(--surface-d);
  border-radius: 5px;

  background-color: var(--surface-a);
  color: var(--text-color);

  .legend-title {
    display: block;
    text-decoration: underline;
    margin-bottom: 0.5em;
  }

  .legend {
    display: flex;
    flex-wrap: nowrap;

    > :first-child {
      padding-right: 0.25em;
    }
  }
}
</style>