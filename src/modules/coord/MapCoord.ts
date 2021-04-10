import { IMapAdapter } from '@/modules/MapAdapter'
import { Coord, ICoord, IImmutableCoord } from '@/modules/coord/Coord'

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
  
  protected constructor(x: number, y: number, adapter: IMapAdapter) {
    super(x, y)
    this.adapter = adapter
  }
  
  get mapX(): number { return this.adapter.toMapX(this.x) }
  
  set mapX(mapX: number) { this.x = this.adapter.fromMapX(mapX) }
  
  get mapY(): number { return this.adapter.toMapY(this.y) }
  
  set mapY(mapY: number) { this.y = this.adapter.fromMapY(mapY) }
  
  clone(): IMapCoord { return new MapCoord(this.x, this.y, this.adapter) }
  
  toString(): string { return `(${Math.round(this.mapX)}, ${Math.round(this.mapY)})` }
  
  // noinspection JSUnusedGlobalSymbols
  toJSON(): object {
    // noinspection JSSuspiciousNameCombination
    return [this.mapX, this.mapY]
  }
  
  static fromCoord(coord: ICoord, adapter: IMapAdapter): MapCoord {
    return new MapCoord(coord.x, coord.y, adapter)
  }
  
  static fromXY(x: number, y: number, adapter: IMapAdapter): MapCoord {
    return new MapCoord(x, y, adapter)
  }
  
  static fromMapXY(mapX: number, mapY: number, adapter: IMapAdapter): MapCoord {
    let coord  = new MapCoord(0, 0, adapter)
    coord.mapX = mapX
    coord.mapY = mapY
    return coord
  }
}

export default MapCoord