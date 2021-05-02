<template>
  <div class="drawing-root" :data-mode="mode"></div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Konva from 'konva'
import { Mode } from '@/modules/mode'
import { IState, IStateManager, StateManager } from '@/modules/state'
import { MAX_SCALE } from '@/modules/utils/constants'
import { IDrawer } from '@/modules/draw/Drawer'
import { DrawFree } from '@/modules/draw/DrawFree'
import { DrawLine } from '@/modules/draw/DrawLine'

export default defineComponent({
  name: 'Drawings',
  props: {
    mode: {
      type: Number as PropType<Mode>,
      required: true,
    },
    state: {
      type: StateManager as PropType<IStateManager>,
      required: true,
    },
    smoothness: {
      type: Number as PropType<number>,
      default: 5,
      validator: (v: number) => v >= 0,
    },
    color: {
      type: String as PropType<string>,
      default: 'red',
    },
    stroke: {
      type: Number as PropType<number>,
      default: 3,
      validator: (v: number) => v > 0,
    },
  },

  data() {
    return {
      stage: null as unknown as Konva.Stage,
      layer: new Konva.Layer(),
      line: null as null | Konva.Line,
      drawers: {} as { [key: string]: IDrawer },
    }
  },

  mounted() {
    const self   = this
    const params = {
      get color() { return self.color },
      get stroke() { return self.stroke },
      get smoothness() { return self.smoothness },
    }

    this.drawers[Mode.EDIT_DRAW] = new DrawFree(this.layer, params)
    this.drawers[Mode.EDIT_LINE] = new DrawLine(this.layer, params)
    this.state.onInit(this.init)
  },

  computed: {
    drawer(): IDrawer | null { return this.drawers[this.mode] ?? null },
  },

  methods: {
    async init({ initialSize }: IStateManager) {
      this.stage = new Konva.Stage({
        container: this.$el,
        width: initialSize,
        height: initialSize,
        pixelRatio: MAX_SCALE,
      })
      this.stage.on('mousedown touchstart', (ev) => this.drawer?.onMouseDown(ev))
      this.stage.on('mousemove touchmove', (ev) => this.drawer?.onMouseMove(ev))
      this.stage.on('mouseup touchend', (ev) => this.drawer?.onMouseUp(ev))
      this.stage.add(this.layer)
      this.stage.draw()
    },

  },

  watch: {
    mode(nVal: Mode, oVal: Mode) {
      this.drawers[oVal]?.destroy()
      console.log(nVal, this.drawer)
    },
    'state.live': {
      deep: true,
      handler({ scale, translate: { x, y } }: IState) {
        this.stage.scaleX(scale)
        this.stage.scaleY(scale)
        this.stage.content.style.marginLeft = `${-x}px`
        this.stage.content.style.marginTop  = `${-y}px`
        this.stage.position({ x, y })
        this.stage.batchDraw()
      },
    },
  },
})
</script>

<style lang="scss">
.drawing-root {
  position: absolute;
  display: block;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 100%;
  min-height: 100%;
}
</style>