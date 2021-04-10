import P5 from 'p5'
import { ceil } from './utils/math'

export interface IMapAdapter {
  readonly p5: P5
  
  readonly scale: number
  readonly scaleX: number
  readonly scaleY: number
  
  /** Translation needed for map coords to match positions on the image **/
  readonly translateX: number
  readonly translateY: number
  
  toMapX(x: number): number
  toMapY(y: number): number
  
  fromMapX(mapX: number): number
  fromMapY(mapY: number): number
  
  toMapWidth(w: number): number
  toMapHeight(h: number): number
  
  fromMapWidth(mapWidth: number): number
  fromMapHeight(mapHeight: number): number
}

export type MapAdapterPadding = {
  padRatioTop?: number
  padRatioRight?: number
  padRatioBottom?: number
  padRatioLeft?: number
}

// noinspection JSUnusedGlobalSymbols
export const GAME_MAP_SQUARE_SIZE: number = 87.5
export const GAME_MAP_SIZE: number        = 1400

export class MapAdapter implements IMapAdapter {
  
  readonly p5: P5
  
  private readonly padTop: number
  private readonly padRight: number
  private readonly padBottom: number
  private readonly padLeft: number
  
  constructor(p5: P5, padding: MapAdapterPadding | number = 0) {
    this.p5 = p5
    if (typeof padding === 'number') {
      this.padTop = this.padLeft = this.padBottom = this.padRight = padding
    } else {
      this.padTop    = padding.padRatioTop ?? 0
      this.padRight  = padding.padRatioRight ?? 0
      this.padBottom = padding.padRatioBottom ?? 0
      this.padLeft   = padding.padRatioLeft ?? 0
    }
  }
  
  private get innerWidth(): number {
    let w = this.p5.width
    return w - ( this.padLeft * w + this.padRight * w )
  }
  
  private get innerHeight(): number {
    let h = this.p5.height
    return h - ( this.padTop * h + this.padBottom * h )
  }
  
  get scale(): number { return ( this.scaleX + this.scaleY ) / 2 }
  
  get scaleX(): number { return this.innerWidth / GAME_MAP_SIZE }
  
  get scaleY(): number { return this.innerHeight / GAME_MAP_SIZE }
  
  get translateX(): number { return this.padLeft * this.p5.width }
  
  get translateY(): number { return this.padTop * this.p5.height }
  
  fromMapWidth(mapWidth: number): number { return mapWidth * this.scaleX }
  
  fromMapHeight(mapHeight: number): number { return mapHeight * this.scaleY }
  
  toMapWidth(w: number): number { return w / this.scaleX }
  
  toMapHeight(h: number): number { return h / this.scaleY }
  
  fromMapX(mapX: number): number { return mapX * this.scaleX + this.translateX }
  
  fromMapY(mapY: number): number { return ( GAME_MAP_SIZE - mapY ) * this.scaleY + this.translateY }
  
  toMapX(x: number): number { return ( x - this.translateX ) / this.scaleX }
  
  toMapY(y: number): number { return GAME_MAP_SIZE - ( y - this.translateY ) / this.scaleY }
}

export default MapAdapter