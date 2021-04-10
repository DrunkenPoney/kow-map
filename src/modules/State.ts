import P5 from 'p5'
import MapAdapter, { IMapAdapter, MapAdapterPadding } from '@/modules/MapAdapter'
import { IMouseCoord, MouseCoord } from '@/modules/coord/MouseCoord'
import tools, { P5Tools } from '@/modules/ui/P5Tools'
import { constrain, isBetween } from '@/modules/utils'

export interface IState {
  readonly p5: P5
  readonly image: P5.Image
  readonly mouse: IMouseCoord
  readonly mapAdapter: IMapAdapter
  readonly tools: P5Tools
  
  translateX: number
  translateY: number
  scale: number
  
  isMouseOver(): boolean
  zoom(delta: number): void
}

export class State implements IState {
  static readonly ZOOM_SENSITIVITY: number = 0.002
  static readonly MIN_SCALE: number        = 1
  static readonly MAX_SCALE: number        = 5
  
  readonly p5: P5
  readonly image: P5.Image
  readonly mouse: IMouseCoord
  readonly mapAdapter: IMapAdapter
  readonly tools: P5Tools
  
  private _scale: number
  private _translateX: number
  private _translateY: number
  
  constructor(p5: P5, image: P5.Image, mapPadding: MapAdapterPadding | number = 0) {
    this.p5         = p5
    this.image      = image
    this.tools      = tools(p5)
    this.mapAdapter = new MapAdapter(p5, mapPadding)
    this.mouse      = new MouseCoord(this)
    
    this._scale        = 1
    this._translateX   = 0
    this._translateY   = 0
  }
  
  isMouseOver(): boolean {
    return isBetween(this.mouse.x, 0, this.p5.width)
      && isBetween(this.mouse.y, 0, this.p5.height)
  }
  
  get scale(): number { return this._scale }
  set scale(scale: number) {
    this._scale = constrain(scale, State.MIN_SCALE, State.MAX_SCALE)
  }
  
  get translateX(): number { return this._translateX }
  set translateX(tx: number) {
    this._translateX = constrain(tx, this.p5.width - this.p5.width * this.scale, 0)
  }
  
  get translateY(): number { return this._translateY }
  set translateY(ty: number) {
    this._translateY = constrain(ty, this.p5.height - this.p5.height * this.scale, 0)
  }
  
  zoom(delta: number) {
    delta = 1 + Math.sign(delta) *
      Math.min(1, Math.abs(delta * State.ZOOM_SENSITIVITY))
    const scale = this.scale
    this.scale *= delta
    delta = this.scale / scale
    
    this.translateX = this.mouse.x * ( 1 - delta ) + this.translateX * delta
    this.translateY = this.mouse.y * ( 1 - delta ) + this.translateY * delta
  }
}

export default State