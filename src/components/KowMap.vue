<template>
  <div ref="container"
       class="map-container"
       :style="`cursor: ${grabbing ? 'grabbing' : 'grab'}`"
       @resize="onContainerResize"
       @wheel.passive="onWheel">
    <div ref="wrapper"
         class="map-wrapper">
      <div class="map-content">
        <img ref="img" alt="KoW Map" src="@/assets/images/kow-map-no-city.png" />
        <div :style="marginStyle">
          <KowCity v-for="(city, idx) in cities" :key="idx"
                   :city="city" :state="live"/>
        </div>
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
import { MAX_SCALE, WHEEL_ZOOM_SENSITIVITY } from '@/modules/utils/constants'
import { constrain } from '@/modules/utils/math'
import { newState } from '@/modules/state'

const refs = {
  img: ref<HTMLImageElement>() as Ref<HTMLImageElement>,
  wrapper: ref<HTMLDivElement>() as Ref<HTMLDivElement>,
  container: ref<HTMLDivElement>() as Ref<HTMLDivElement>,
}

type ZoomOpts = {
  scale: number,
  zoomX: number,
  zoomY: number,
  persist?: boolean
}

export default defineComponent({
  name: 'KowMap',
  components: { KowCity },
  setup: () => refs,

  data() {
    return {
      cities: [] as Array<ICity>,
      hammer: {} as HammerManager,
      grabbing: false,
      initialSize: 0,
      persisted: newState(),
      live: newState(),
    }
  },

  mounted(): void {
    if (isMobile()) {
      this.img.width = Math.max(screen.width, screen.height)
    }

    if (this.img.complete) {
      this.onImgLoad()
    } else {
      this.img.addEventListener('load', this.onImgLoad)
    }

    this.hammer = new Hammer.Manager(this.container)
    this.hammer.add(new Hammer.Pan())
    this.hammer.add(new Hammer.Pinch())
    this.hammer.add(new Hammer.Tap())
    this.hammer.on('panend', this.onPan)
    this.hammer.on('panmove', this.onPan)
    this.hammer.on('pinchmove', this.onPinch)
    this.hammer.on('pinchend', this.onPinch)
    this.hammer.on('tap', this.onTap)

  },

  computed: {
    img() { return refs.img.value as HTMLImageElement },
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
    onImgLoad() {
      this.initialSize = this.img.width
      this.cities      = cities
    },

    onContainerResize(ev: UIEvent) {
      this.translateX(this.persisted.translate.x, true)
      this.translateY(this.persisted.translate.y, true)
      this.zoom(this.persisted.scale, true)
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

      this.zoomAt({
        scale,
        zoomX: ev.x,
        zoomY: ev.y,
        persist: true
      })
    },

    onPinch(ev: HammerInput) {
      this.zoomAt({
        scale: ev.scale,
        zoomX: ev.center.x,
        zoomY: ev.center.y,
        persist: ev.type === 'pinchend'
      })
    },

    onPan(ev: HammerInput): void {
      const persist = ev.type === 'panend'
      this.grabbing = !persist
      this.translateX(this.persisted.translate.x + ev.deltaX, persist)
      this.translateY(this.persisted.translate.y + ev.deltaY, persist)
    },

    zoomAt({ scale, zoomX, zoomY, persist = false }: ZoomOpts): void {
      const prevScale = this.persisted.scale
      scale = this.zoom(scale * this.persisted.scale, persist) / prevScale
      this.translateX(zoomX * (1 - scale) + this.persisted.translate.x * scale, persist)
      this.translateY(zoomY * (1 - scale) + this.persisted.translate.y * scale, persist)
    },

    zoom(scale: number, persist: boolean = false): number {
      scale = this.initialSize * Math.min(scale, MAX_SCALE)
      scale = Math.max(scale, this.container.clientWidth, this.container.clientHeight)
      scale /= this.initialSize
      if (persist) this.persisted.scale = scale
      this.live.scale = scale
      return scale
    },

    translateX(x: number, persist: boolean = false): void {
      x = constrain(x, this.container.clientWidth - this.img.width, 0)
      if (persist) this.persisted.translate.x = x
      this.live.translate.x = x
    },

    translateY(y: number, persist: boolean = false): void {
      y = constrain(y, this.container.clientHeight - this.img.height, 0)
      if (persist) this.persisted.translate.y = y
      this.live.translate.y = y
    },

  },

  watch: {
    'live.translate.y'(y) { this.wrapper.style.top = y + 'px' },
    'live.translate.x'(x) { this.wrapper.style.left = x + 'px' },
    'live.scale'(scale) { this.img.width = this.img.height = scale * this.initialSize },
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