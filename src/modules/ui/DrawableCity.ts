import { IDrawable, IHoverable } from '@/modules/ui/Drawable'
import { City, CityLevel } from '@/modules/data/cities'
import MapCoord, { IImmutableMapCoord } from '@/modules/coord/MapCoord'
import { Boost } from '@/modules/data/boosts'
import P5 from 'p5'
import { IMapAdapter } from '@/modules/MapAdapter'
import { IState } from '@/modules/State'
import { distance } from '@/modules/utils'
import tools, { P5Tools } from '@/modules/ui/P5Tools'


export interface IDrawableCity extends IDrawable, IHoverable {
  readonly name: string
  readonly level: CityLevel
  readonly coords: IImmutableMapCoord
  readonly boosts: Array<Boost>
  
  readonly color: Array<number>
  toJSON(): City
}

const LVL_RADIUS    = [ 5, 8, 11, 14 ]
const LVL_TEXT_SIZE = [ 13, 18, 22, 26 ]

export class DrawableCity implements IDrawableCity, IHoverable {
  private readonly state: IState
  private readonly tools: P5Tools
  private readonly _city: City
  
  readonly name: string
  readonly level: CityLevel
  readonly coords: IImmutableMapCoord
  readonly boosts: Boost[]
  
  constructor(city: City, state: IState) {
    this._city = city
    this.state  = state
    this.name   = city.name
    this.level  = city.level
    this.coords = MapCoord.fromMapXY(city.coords[0], city.coords[1], state.mapAdapter)
    this.boosts = city.boosts
    this.tools  = tools(state.p5)
  }
  
  private get adapter(): IMapAdapter { return this.state.mapAdapter }
  
  private get radius(): number { return LVL_RADIUS[this.level - 1] }
  
  get color(): Array<number> {
    let boosts = this.boosts.filter((b) => !b.cat.disabled)
    if (boosts.length === 0)
      return [ 0 ]
    // TODO pie colors (or mix)
    return this.boosts[0].cat.color
  }
  
  isMouseOver(): boolean {
    return this.radius >= distance(this.coords, [this.state.mouse.absX, this.state.mouse.absY])
  }
  
  private calcStyle(p5: P5): any {
    const mapScale = this.adapter.scale
    const over     = this.isMouseOver()
    return {
      scale: mapScale,
      color: this.color,
      radius: this.radius * mapScale,
      strokeWeight: ( over ? 3 : 2 ) * mapScale,
      textSize: LVL_TEXT_SIZE[this.level - 1] * mapScale,
      textStyle: over ? p5.BOLD : p5.NORMAL,
      textFont: 'Oswald',
    }
  } // END calcStyle
  
  draw(): void {
    const p5       = this.state.p5
    const tools    = this.state.tools
    const style    = this.calcStyle(p5)
    const { x, y } = this.coords
    p5.noFill()
    p5.strokeWeight(style.strokeWeight)
    p5.stroke(style.color)
    p5.circle(x, y, style.radius * 2)
    
    switch (this.level) {
      case 4:
      case 3:
        p5.fill(style.color)
        tools.star(x, y, style.radius / 4, style.radius - style.strokeWeight - 1, 5, 0.7 * p5.PI)
        break
      case 2:
        p5.circle(x, y, style.scale)
        break
    }
    
    p5.noStroke()
    p5.fill(style.color)
    p5.textSize(style.textSize)
    p5.textStyle(style.textStyle)
    p5.textAlign(p5.LEFT, p5.CENTER)
    p5.textFont(style.textFont)
    p5.text(this.name, x + style.radius + style.strokeWeight + 1, y)
  } // END draw
  
  toJSON(): City { return this._city } // END toJSON
}

export default DrawableCity