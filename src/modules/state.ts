import { reactive } from 'vue'

export interface IState {
  readonly translate: {
    x: number
    y: number
  }
  scale: number
}

export function newState(): IState {
  return reactive({
    translate: { x: 0, y: 0 },
    scale: 1
  })
}