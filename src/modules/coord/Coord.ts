import { Mutable } from '@/modules/utils/types'

export interface IImmutableCoord {
  readonly x: number
  readonly y: number
  toString(): string
}

export interface ICoord extends Mutable<IImmutableCoord> {
}

export class Coord implements ICoord {
  x: number
  y: number
  
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
  
  clone(): ICoord { return new Coord(this.x, this.y) }
  
  toString(): string { return `(${Math.round(this.x)}, ${Math.round(this.y)})` }
}
