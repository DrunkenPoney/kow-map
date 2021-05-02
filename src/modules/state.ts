import { reactive } from 'vue'
import { DeepReadonly } from '@/modules/utils/types'
import { MAX_SCALE } from '@/modules/utils/constants'
import { constrain } from '@/modules/utils/math'

type Awaitable<T> = Promise<T> | ( () => Promise<T> )

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
    scale: 1,
  })
}

type InitCallback<T extends IStateManager> = (sm: T) => any

export interface IStateManager {
  readonly persisted: DeepReadonly<IState>
  readonly live: DeepReadonly<IState>
  readonly initialSize: number
  readonly initialized: boolean
  
  onInit(callback: InitCallback<this>): void
  init(container: HTMLElement, img: HTMLImageElement): Promise<void>
  
  zoom(scale: number, persist?: boolean): number
  zoomAt(scale: number, zoomX: number, zoomY: number, persist?: boolean): void
  translateX(x: number, persist?: boolean): void
  translateY(y: number, persist?: boolean): void
}

export class StateManager implements IStateManager {
  private readonly _initCallbacks: Array<InitCallback<this>>
  private _initialSize: number
  private _initialized: boolean
  private container!: HTMLElement
  private img!: HTMLImageElement
  readonly persisted: IState
  readonly live: IState
  
  constructor() {
    this._initCallbacks = []
    this._initialSize   = 0
    this._initialized = false
    
    this.persisted = newState()
    this.live      = newState()
  }
  
  onInit(callback: InitCallback<this>): void {
    this._initCallbacks.push(callback)
    if (this.initialized) callback(this)
  }
  
  async init(container: HTMLElement, img: HTMLImageElement): Promise<void> {
    if (this.initialized) return
    if (img.complete) {
      await this._init(container, img)
    } else {
      await new Promise((resolve, reject) => {
        img.addEventListener('load',
          () => this._init(container, img).then(resolve).catch(reject),
          { once: true })
      })
    }
  }
  
  private async _init(container: HTMLElement, img: HTMLImageElement): Promise<void> {
    this._initialSize = img.width
    this.container    = container
    this.img          = img
    this._initialized = true
    container.addEventListener('resize', this.refresh)
    await Promise.all(this._initCallbacks.map((cb) => cb(this)))
  }
  
  private refresh(): void {
    this.translateX(this.persisted.translate.x, true)
    this.translateY(this.persisted.translate.y, true)
    this.zoom(this.persisted.scale, true)
  }
  
  get initialSize(): number { return this._initialSize }
  get initialized(): boolean { return this._initialized }
  
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
    scale           = this.zoom(scale * this.persisted.scale, persist) / prevScale
    this.translateX(zoomX * ( 1 - scale ) + this.persisted.translate.x * scale, persist)
    this.translateY(zoomY * ( 1 - scale ) + this.persisted.translate.y * scale, persist)
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