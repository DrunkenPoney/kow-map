import { Coord, ICoord, IImmutableCoord } from '@/modules/coord/Coord'
import { IMapAdapter } from '@/modules/adapt/MapAdapter'
import { reactive } from 'vue'

export interface IImmutableMapCoord extends IImmutableCoord {
  readonly mapX: number
  readonly mapY: number
}

export interface IMapCoord extends ICoord {
  mapX: number
  mapY: number
}

export class MapCoord extends Coord implements IMapCoord {
  private readonly adapter: IMapAdapter
  
  private constructor(x: number, y: number, adapter: IMapAdapter) {
    super(x, y)
    this.adapter = adapter
  }
  
  get mapX(): number { return this.adapter.toMapX(this.x) }
  set mapX(mapX: number) { this.x = this.adapter.fromMapX(mapX) }
  
  get mapY(): number { return this.adapter.toMapY(this.y) }
  set mapY(mapY: number) { this.y = this.adapter.fromMapY(mapY) }
  
  toString(): string { return `(${Math.round(this.mapX)}, ${Math.round(this.mapY)})` }
  
  toJSON(): object { return [this.mapX, this.mapY] }
  
  clone(): IMapCoord { return MapCoord.fromXY(this.x, this.y, this.adapter) }
  
  static fromCoord(coord: ICoord, adapter: IMapAdapter): IMapCoord {
    return this.fromXY(coord.x, coord.y, adapter)
  }
  
  static fromMapXY(mapX: number, mapY: number, adapter: IMapAdapter): IMapCoord {
    let coord  = this.fromOrigin(adapter)
    coord.mapX = mapX
    coord.mapY = mapY
    return coord
  }
  
  static fromOrigin(adapter: IMapAdapter): IMapCoord {
    return this.fromXY(0, 0, adapter)
  }
  
  static fromXY(x: number, y: number, adapter: IMapAdapter): IMapCoord {
    return reactive(new MapCoord(x, y, adapter)) as IMapCoord
  }
}