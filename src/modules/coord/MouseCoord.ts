import { IImmutableMapCoord } from '@/modules/coord/MapCoord'
import P5 from 'p5'
import { IMapAdapter } from '@/modules/MapAdapter'
import { IState } from '@/modules/State'

export interface IMouseCoord extends IImmutableMapCoord {
  readonly absX: number
  readonly absY: number
}

export class MouseCoord implements IMouseCoord {
  private readonly state: IState
  
  constructor(state: IState) {
    this.state   = state
  }
  
  private get p5(): P5 { return this.state.p5 }
  private get adapter(): IMapAdapter { return this.state.mapAdapter }
  
  get x(): number { return this.p5.mouseX }
  
  get y(): number { return this.p5.mouseY }
  
  get absX(): number {
    const ratio = this.p5.width / this.state.scale / this.p5.width
    return ratio * this.x - ratio * this.state.translateX
  }
  
  get absY(): number {
    const ratio = this.p5.height / this.state.scale / this.p5.height
    return ratio * this.y - ratio * this.state.translateY
  }
  
  get mapX(): number { return this.adapter.toMapX(this.absX) }
  
  get mapY(): number { return this.adapter.toMapY(this.absY) }
  
  toString(): string { return `(${Math.round(this.mapX)}, ${Math.round(this.mapY)})\n`+
    `(${Math.round(this.x)}, ${Math.round(this.y)})`}
}

