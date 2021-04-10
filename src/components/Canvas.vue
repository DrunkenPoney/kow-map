<template>
  <div ref="target" :style="{ width, height }"></div>
</template>

<script lang="ts">
import P5 from 'p5'
import State, { IState } from '@/modules/State'
import DrawableCity, { IDrawableCity } from '@/modules/ui/DrawableCity'
import cities from '@/modules/data/cities'
import { defineComponent } from 'vue'
import { IMouseCoord } from '@/modules/coord/MouseCoord'
import { ceil } from '@/modules/utils'

export default defineComponent({
  props: {
    // TODO on width/height change resize canvas
    width: {
      type: Number,
      default: 1000,
      validator: (value: number) => value > 0,
    },
    height: {
      type: Number,
      default: 1000,
      validator: (value: number) => value > 0,
    },
  },

  data() {
    return {
      state: <IState><any>null,
      cities: <Array<IDrawableCity>><any>null,
      image: <P5.Image><any>null,
      moveEnabled: false,
    }
  },

  mounted() { new P5(this.init, <HTMLDivElement> this.$refs.target) },

  computed: {
    p5(): P5 { return this.state.p5 },
    mouse(): IMouseCoord { return this.state.mouse },
  },

  methods: {
    init(p5: P5) {
      p5.preload       = () => this.preload(p5)
      p5.setup         = () => this.setup(p5)
      p5.draw          = () => this.draw(p5)
      p5.mouseWheel    = this.mouseWheel
      p5.mouseClicked  = this.mouseClicked
      p5.mousePressed  = this.mousePressed
      p5.mouseReleased = this.mouseReleased
    }, // END init

    preload(p5: P5) {
      this.image = p5.loadImage(require('@/assets/kow-map-no-city.png'))
    }, // END preload

    setup(p5: P5) {
      p5.createCanvas(window.innerHeight, window.innerHeight)
      this.image.resize(window.innerHeight, 0)
      p5.frameRate(15)

      this.state = new State(p5, this.image, ceil(1 / 18, 3))
      this.cities = cities.map((city) => new DrawableCity(city, this.state))
      // @ts-ignore
      window.state = this.state // TODO remove
    }, // END setup

    mousePressed(): boolean | void {
      if (!this.state.isMouseOver()) return
      this.moveEnabled = true
      return false
    }, // END mousePressed

    mouseReleased(): boolean | void {
      if (!this.moveEnabled) return
      this.moveEnabled = false
      return false
    }, // END mouseReleased

    mouseClicked(event: MouseEvent): boolean | void {
      if (!this.state.isMouseOver()) return
      for (let city of this.cities) {
        if (city.isMouseOver()) {
          this.$emit('city-clicked', city.toJSON())
          break
        }
      }
      return false
    }, // END mouseClicked

    mouseWheel({ delta }: any): boolean | void {
      if (!this.state.isMouseOver()) return
      this.state.zoom(delta)
      return false
    }, // END mouseWheel

    draw(p5: P5) {
      p5.cursor(p5.ARROW)
      this.state.tools.resetStyle()
      p5.background(0)

      p5.push()
      p5.translate(this.state.translateX, this.state.translateY)
      p5.scale(this.state.scale)
      p5.image(this.image, 0, 0)

      for (let city of this.cities) {
        if (city.isMouseOver())
          p5.cursor(p5.HAND)
        city.draw()
        this.state.tools.resetStyle()
      }

      p5.pop()

      if (this.moveEnabled) {
        p5.cursor('grabbing')
        this.state.translateX += p5.mouseX - p5.pmouseX
        this.state.translateY += p5.mouseY - p5.pmouseY
      }

      p5.fill(0)
      p5.textAlign(p5.LEFT, p5.TOP)
      p5.text(this.mouse.toString(), this.mouse.x + 10, this.mouse.y + 12)
    }, // END draw
  }, // END methods
})
</script>

<style lang="scss" scoped>

</style>