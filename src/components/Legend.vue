<template>
  <div class="legend-wrapper">
    <strong class="legend-title" @click="opened = !opened">
      <span :class="`pi pi-chevron-${opened ? 'down' : 'right'}`"
            style="font-size: 9px"/>
      <span class="legend-title-text">Legend</span>
    </strong>
    <template v-if="opened">
      <div v-for="(cat, idx) in categories" :key="idx"
           class="legend">
        <div><span :style="{ color: colorOf(cat) }" v-html="blocks(1)" />:</div>
        <div v-text="cat.name" />
      </div>
    </template>
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
      opened: false
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
  font-size: 10px;

  border: 2px solid var(--surface-d);
  border-radius: 5px;

  background-color: var(--surface-a);
  color: var(--text-color);

  .legend-title {
    display: block;
    cursor: pointer;
    padding: .25em;

    &:hover {
      background-color: var(--surface-d);
    }

    .legend-title-text {
      padding-left: .25em;
      text-decoration: underline;
    }
  }

  .legend {
    display: flex;
    flex-wrap: nowrap;
    padding-left: .25em;
    padding-right: .25em;
    line-height: 1;

    &:first-of-type {
      margin-top: 0.5em;
    }

    &:last-of-type {
      padding-bottom: .25em;
    }

    > :first-child {
      padding-right: 0.25em;
    }
  }
}
</style>