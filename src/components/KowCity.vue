<template>
  <button
      :class="`level-${city.level}`">
    <i v-if="city.level >= 3" class="city-star" />
    <span v-else-if="city.level === 2" class="dot" ref="dot" />
    <span v-else/>
    <span class="btn-city-name">{{ city.name }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent, Prop } from 'vue'
import { City, ICity } from '@/modules/data/cities'
import { ICoord } from '@/modules/coord/Coord'
import { GAME_MAP_SIZE } from '@/modules/utils/constants'
import { IState } from '@/modules/state'
import { color } from '@/modules/utils/colors'

export function colorOf(city: ICity): string {
  let boosts = city.boosts.filter((b) => !b.cat.disabled)
  if (boosts.length === 0)
    return color(0)
  return color(boosts[0].cat.color)
}

export default defineComponent({
  name: 'KowCity',

  props: {
    city: {
      type: City,
      required: true,
    },
    state: <Prop<IState>>{
      required: true,
    },
  },

  data() {
    return {
      coords: {} as ICoord,
    }
  },

  computed: {
    btn(): HTMLButtonElement { return this.$el },
    dot(): HTMLElement | null { return this.$refs.dot as HTMLElement | null }
  },

  mounted(): void {
    this.btn.style.borderColor =
        this.btn.style.color = colorOf(this.city)
    if (this.dot != null)
      this.dot.style.backgroundColor = this.btn.style.color

    let [ x, y ] = this.city.coords
    let rX       = x / GAME_MAP_SIZE * 100,
        rY       = y / GAME_MAP_SIZE * 100

    this.btn.style.left   = `${rX}%`
    this.btn.style.bottom = `${rY}%`
  },
})

</script>

<style lang="scss" scoped>
@use "sass:list";

$city-radius: 6px, 10px, 14px, 17px;

button {
  all: unset;
  border-style: solid;
  border-radius: 50%;
  border-width: 2px;
  position: absolute;
  display: block;
  overflow: visible;
  z-index: 1000;
  font-size: smaller;
  font-weight: bold;
  font-stretch: ultra-condensed;
  text-align: center;

  @each $radius in $city-radius {
    $idx: list.index($city-radius, $radius);

    &.level-#{$idx} {
      width: $radius;
      height: $radius;
      margin: -$radius / 2;

      .city-star {
        font-size: $radius / 2;
      }
    }
  }

  &:hover {
    transform: scale(1.2);
    cursor: pointer;
  }

  .dot {
    display: inline-block;
    border-radius: 50%;
    width: 4px;
    height: 4px;
    position: absolute;
    margin: auto;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
  }

  span.btn-city-name {
    position: absolute;
    display: inline-block;
    margin: auto auto auto 4px;
    left: 100%;
    top: 0;
    bottom: 0;
    height: 0;
    line-height: 0;
    white-space: nowrap;
    font-weight: normal;
    color:  black;
    pointer-events: none;
  }

  .city-star {
    position: relative;
    vertical-align: top;

    display: inline-block;
    width: 0;
    height: 0;

    border-right:  .3em solid transparent;
    border-bottom: .7em solid;
    border-left:   .3em solid transparent;

    &:before, &:after {
      content: '';

      display: block;
      width: 0;
      height: 0;

      position: absolute;
      top: .6em;
      left: -1em;

      border-right:  1em solid transparent;
      border-bottom: .7em solid;
      border-left:   1em solid transparent;

      transform: rotate(-35deg);
    }

    &:after {
      transform: rotate(35deg);
    }
  }
}
</style>