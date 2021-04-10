<template>
  <div class="d-flex">

    <div class="flex-grow-1 px-1" v-if="!!city">
      <h4 class="text-decoration-underline text-center"
          v-text="city?.name"/>
      <div class="row">
        <span class="col-4">Level:</span>
        <span class="col-8" v-text="city?.level"/>
      </div>
      <div class="row">
        <span class="col-4">Coordinates:</span>
        <span class="col-8">({{city.coords[0]}}; {{city.coords[1]}})</span>
      </div>
      <div class="row">
        <span class="col-12">Boosts:</span>
        <div class="offset-1 col-11">
        </div>
      </div>
      <div v-for="(boost, idx) in city.boosts" :key="idx" class="row px-3">
        <span class="col-4">&bull; {{boost.name}}:</span>
        <span class="col-8">{{Math.round(boost.value * 1000)/10}}%</span>
      </div>

    </div>

    <Canvas class="flex-grow-0"
            :width="1000" :height="1000"
            @city-clicked="onCity" />
  </div>
</template>
<script lang="ts">
import Canvas from '@/components/Canvas.vue'
import { defineComponent } from 'vue'
import { IDrawableCity } from '@/modules/ui/DrawableCity'
import { City } from '@/modules/data/cities'

export default defineComponent({
  components: {
    Canvas,
  },

  data() {
    return {
      city: <City> <any> null
    }
  },

  methods: {
    onCity(city: City) {
      this.city = city

    }
  }
})
</script>

<style lang="scss">
html, body {
  padding: 0;
  margin: 0;
  background-color: var(--bs-gray-dark);
  color: var(--bs-light)
}
.container {
  display: flex;

  .panel {
    flex-grow: 1;
  }
}
</style>