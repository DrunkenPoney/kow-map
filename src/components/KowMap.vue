<template>
  <div ref="container"
       class="map-container"
       :style="`cursor: ${grabbing ? 'grabbing' : 'grab'}`"
       @wheel.passive="onWheel">
    <div ref="wrapper"
         class="map-wrapper">
      <div class="map-content">
        <img ref="img" @load="onLoad"
             alt="KoW Map" src="@/assets/images/kow-map-no-city.png" />
        <div :style="marginStyle">
          <KowCity v-for="(city, idx) in cities" :key="idx"
                   :city="city" :state="state.live" />
        </div>
        <Legend />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import '@/assets/images/kow-map-no-city.png'
import { defineComponent, ref, Ref } from 'vue'
import cities, { ICity } from '@/modules/data/cities'
import KowCity from '@/components/KowCity.vue'
import { isMobile } from '@/modules/utils/browser'
import Hammer from 'hammerjs'
import { WHEEL_ZOOM_SENSITIVITY } from '@/modules/utils/constants'
import { IStateManager, StateManager } from '@/modules/state'
import Legend from '@/components/Legend.vue'

const refs = {
  img: ref<HTMLImageElement>() as Ref<HTMLImageElement>,
  wrapper: ref<HTMLDivElement>() as Ref<HTMLDivElement>,
  container: ref<HTMLDivElement>() as Ref<HTMLDivElement>,
}

export default defineComponent({
  name: 'KowMap',
  components: { Legend, KowCity },
  setup: () => refs,

  data() {
    return {
      cities: [] as Array<ICity>,
      hammer: {} as HammerManager,
      grabbing: false,
      state: null as unknown as IStateManager,
    }
  },

  mounted(): void {
  },

  computed: {
    img(): HTMLImageElement { return this.$refs.img as HTMLImageElement },
    wrapper() { return refs.wrapper.value as HTMLDivElement },
    container() { return refs.container.value as HTMLDivElement },
    marginStyle() {
      let pad = 1 / 18 * 100
      return {
        position: 'absolute',
        width: `${100 - ( 2 * pad )}%`,
        height: `${100 - ( 2 * pad )}%`,
        top: 0,
        left: 0,
        margin: `${pad}%`,
      }
    },
  },

  methods: {
    onLoad(): void {
      if (isMobile()) this.img.width = Math.max(screen.width, screen.height)
      this.state = new StateManager(this.$el, this.img)

      this.hammer = new Hammer.Manager(this.container)
      this.hammer.add(new Hammer.Pan())
      this.hammer.add(new Hammer.Pinch())
      this.hammer.add(new Hammer.Tap())
      this.hammer.on('panend', this.onPan)
      this.hammer.on('panmove', this.onPan)
      this.hammer.on('pinchmove', this.onPinch)
      this.hammer.on('pinchend', this.onPinch)
      this.hammer.on('tap', this.onTap)

      this.cities = cities
    },

    onTap(ev: HammerInput) {
      if (!ev.target.classList.contains('city')) {
        console.debug('tap', ev)
      }
    },

    onWheel(ev: WheelEvent) {
      if (ev.deltaY === 0) return
      const scale = 1 + Math.sign(ev.deltaY) *
          Math.min(1, Math.abs(ev.deltaY * WHEEL_ZOOM_SENSITIVITY))
      this.state.zoomAt(scale, ev.x, ev.y, true)
    },

    onPinch(ev: HammerInput) {
      this.state.zoomAt(ev.scale, ev.center.x, ev.center.y, ev.type === 'pinchend')
    },

    onPan(ev: HammerInput): void {
      this.grabbing = ev.type !== 'panend'
      this.state.translateX(this.state.persisted.translate.x + ev.deltaX, !this.grabbing)
      this.state.translateY(this.state.persisted.translate.y + ev.deltaY, !this.grabbing)
    },

  },

  watch: {
    'state.live.translate.y'(y) { this.wrapper.style.top = y + 'px' },
    'state.live.translate.x'(x) { this.wrapper.style.left = x + 'px' },
    'state.live.scale'(scale) { this.img.width = this.img.height = scale * this.state.initialSize },
  },
})
</script>

<style lang="scss" scoped>
.map-container {
  position: relative;
  touch-action: none;
  -ms-touch-action: none;
  width: 100vw;
  height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  user-select: none;

  .map-wrapper {
    position: absolute;
    will-change: top, left;

    > .map-content {
      position: relative;

      > img {
        pointer-events: none;
        will-change: width, height;
        vertical-align: middle;
      }
    }
  }
}
</style>