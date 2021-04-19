import { reactive } from 'vue'
import { DeepReadonly } from '@/modules/utils/types'
import { MAX_SCALE } from '@/modules/utils/constants'
import { constrain } from '@/modules/utils/math'

export interface IState {
  readonly translate: {
    x: number
    y: number
  }
  scale: number
}

function newState(): IState {
  return reactive({
    translate: { x: 0, y: 0 },
    scale: 1
  })
}

export interface IStateManager {
  readonly persisted: DeepReadonly<IState>
  readonly live: DeepReadonly<IState>
  readonly initialSize: number
  
  zoom(scale: number, persist?: boolean): number
  zoomAt(scale: number, zoomX: number, zoomY: number, persist?: boolean): void
  translateX(x: number, persist?: boolean): void
  translateY(y: number, persist?: boolean): void
}

export class StateManager implements IStateManager {
  private readonly container: HTMLElement
  private img!: HTMLImageElement
  private _initialSize: number
  readonly persisted: IState
  readonly live: IState
  
  constructor(container: HTMLElement, img: HTMLImageElement) {
    this.container = container
    this.img = img
    this.persisted = newState()
    this.live = newState()
    this._initialSize = 0
    
    container.addEventListener('resize', this.refresh)
    if (img.complete) this.init()
    else img.addEventListener('load', this.init,  { once: true })
  }
  
  private init(): void { this._initialSize = this.img.width }
  
  private refresh(): void {
    this.translateX(this.persisted.translate.x, true)
    this.translateY(this.persisted.translate.y, true)
    this.zoom(this.persisted.scale, true)
  }
  
  get initialSize(): number { return this._initialSize }
  
  zoom(scale: number, persist: boolean = false): number {
    scale = this.initialSize * Math.min(scale, MAX_SCALE)
    scale = Math.max(scale, this.container.clientWidth, this.container.clientHeight)
    scale /= this.initialSize
    if (persist) this.persisted.scale = scale
    this.live.scale = scale
    return scale
  }
  
  zoomAt(scale: number, zoomX: number, zoomY: number, persist: boolean = false): void {
    const prevScale = this.persisted.scale
    scale = this.zoom(scale * this.persisted.scale, persist) / prevScale
    this.translateX(zoomX * (1 - scale) + this.persisted.translate.x * scale, persist)
    this.translateY(zoomY * (1 - scale) + this.persisted.translate.y * scale, persist)
  }
  
  translateX(x: number, persist: boolean = false): void {
    x = constrain(x, this.container.clientWidth - this.img.width, 0)
    if (persist) this.persisted.translate.x = x
    this.live.translate.x = x
  }
  
  translateY(y: number, persist: boolean = false): void {
    y = constrain(y, this.container.clientHeight - this.img.height, 0)
    if (persist) this.persisted.translate.y = y
    this.live.translate.y = y
  }
}