<template>
  <button :class="`city level-${city.level}`"
          ref="btn"
          @click="onClick">
    <i v-if="city.level >= 3" class="city-star" />
    <span v-else-if="city.level === 2" class="dot" ref="dot" />
    <span v-else/>
    <span class="btn-city-name">{{ city.name }}</span>
  </button>
  <div style="display: none">
    <div class="city-tooltip" ref="tooltip">
      <div class="p-grid">
        <div class="p-col-5 p-pb-1">Level:</div>
        <div class="p-col p-pb-1" v-text="city.level"/>
      </div>
      <div class="p-grid">
        <div class="p-col-5 p-py-1">Coords:</div>
        <div class="p-col p-py-1">({{city.coords[0]}}; {{city.coords[1]}})</div>
      </div>
      <div class="p-grid">
        <div class="p-col p-pt-1 p-pb-0">Boosts:</div>
      </div>
      <table style="border-collapse: collapse">
        <tbody>
        <tr v-for="(boost, idx) in city.boosts" :key="idx">
          <td style="padding-left: .5em; padding-right: .25em">&bull; {{ boost.name }}:</td>
          <td v-text="fmtBoost(boost)" />
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Prop } from 'vue'
import { City, ICity } from '@/modules/data/cities'
import { GAME_MAP_SIZE } from '@/modules/utils/constants'
import { IState } from '@/modules/state'
import { color } from '@/modules/utils/colors'
import tippy from 'tippy.js'
import { IBoost } from '@/modules/data/boosts'
import { round } from '@/modules/utils/math'

export function colorOf(city: ICity): string {
  let boosts = city.boosts.filter((b) => !b.cat.disabled)
  if (boosts.length === 0)
    return color(0)
  return color(boosts[0].cat.color)
}

export default defineComponent({
  name: 'KowCity',
  emits: ['city-select'],
  props: {
    city: {
      type: City,
      required: true,
    },
    state: <Prop<IState>>{
      required: true,
    },
  },

  computed: {
    btn(): HTMLButtonElement { return this.$refs.btn as HTMLButtonElement },
    dot(): HTMLElement | null { return this.$refs.dot as HTMLElement | null },
    tooltip(): HTMLElement { return this.$refs.tooltip as HTMLElement }
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

    tippy(this.btn, {
      content: this.tooltip,
      interactive: true,
      appendTo: document.body,
    })
  },

  methods: {
    onClick(ev: PointerEvent): void {
      this.$emit('city-select', this.city, ev)
    },

    fmtBoost(boost: IBoost): string {
      return `${round(boost.value * 100, 2)}%`
    }
  }
})

</script>

<style lang="scss" scoped>
@use "sass:list";
@use "sass:math";
@import "src/assets/scss/modes";

.city-tooltip {
  * {
    white-space: nowrap;
  }
}

$city-radius: 4px, 10px, 14px, 17px;

button {
  all: unset;
  border-style: solid;
  border-radius: 50%;
  border-width: 2px;
  position: absolute;
  display: block;
  overflow: visible;
  z-index: 2000;
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

      > .btn-city-name {
        font-size: math.max($radius + 1px, 10px);
      }

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
    color: black;
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