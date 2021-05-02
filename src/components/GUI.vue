<template>
  <div class="gui-wrapper">
    <Legend />

    <div class="btn-bar">
      <Button type="button" class="p-mr-1" :disabled="!$hist.canUndo" @click="undo">
        <span class="material-icons">undo</span>
      </Button>
      <SelectButton :modelValue="mode" @update:modelValue="onModeChange"
                    :options="modes" dataKey="mode"
                    optionLabel="icon" optionValue="mode"
                    class="modes-wrapper">
        <template #option="{ option }">
          <span class="material-icons" v-text="option.icon" />
        </template>
      </SelectButton>
      <Button type="button" class="p-ml-1" :disabled="!$hist.canRedo" @click="redo">
        <span class="material-icons">redo</span>
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Mode } from '@/modules/mode'
import SelectButton from 'primevue/selectbutton'
import Button from 'primevue/button'
import Legend from '@/components/Legend.vue'

export default defineComponent({
  name: 'GUI',
  components: { Legend, SelectButton, Button },
  emits: [ 'update:mode' ],
  props: {
    mode: {
      type: Number as PropType<Mode>,
      default: Mode.VIEW,
    },
  },
  data() {
    return {
      modes: [
        { mode: Mode.VIEW, icon: 'navigation' },
        { mode: Mode.EDIT_DRAW, icon: 'draw' },
        { mode: Mode.EDIT_LINE, icon: 'linear_scale' }/*,
        { mode: Mode.EDIT_TEXT, icon: 'text_fields' }*/ ],
    }
  },

  methods: {
    onModeChange(nVal: Mode) { this.$emit('update:mode', nVal) },
    undo() { this.$hist.undo() },
    redo() { this.$hist.redo() },
  }
})
</script>

<style lang="scss">
.gui-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;

  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;

  pointer-events: none;
  > * { pointer-events: auto }

  $font-size: 10px;

  * {
    font-size: $font-size;
  }

  .btn-bar {
    text-align: center;
    position: absolute;
    margin: auto;
    bottom: 1em;
    right: 0;
    left: 0;

    .modes-wrapper {
      display: inline-block;
      width: fit-content;
    }

    .p-button {
      padding: (.5 * $font-size) (.75 * $font-size) !important;

    }
  }
}
</style>