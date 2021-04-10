import P5 from 'p5'

export interface P5Tools {
  resetStyle(): void
  star(x: number, y: number, radius1: number, radius2: number, npoints: number, offset?: number): void
}

class Tools implements P5Tools {
  private static _instances: Map<P5, P5Tools>
  
  private readonly p5: P5
  constructor(p5: P5) { this.p5 = p5 }
  
  resetStyle() {
    this.p5.textSize(12)
    this.p5.textLeading(15)
    this.p5.textFont('sans-serif')
    this.p5.textStyle(this.p5.NORMAL)
    this.p5.textAlign(this.p5.LEFT, this.p5.BASELINE)
    this.p5.rectMode(this.p5.CORNER)
    this.p5.ellipseMode(this.p5.CENTER)
    this.p5.imageMode(this.p5.CORNER)
    
    this.p5.noStroke()
    this.p5.noFill()
    this.p5.strokeWeight(1)
  } // END resetStyle
  
  star(x: number, y: number, radius1: number, radius2: number, npoints: number, offset: number = 0): void {
    const angle = this.p5.TWO_PI / npoints,
          halfAngle = angle / 2
    this.p5.beginShape()
    for (let a, b = 0; b < this.p5.TWO_PI; b += angle) {
      a = b + offset;
      this.p5.vertex(
        x + this.p5.cos(a) * radius2,
        y + this.p5.sin(a) * radius2)
      this.p5.vertex(
        x + this.p5.cos(a + halfAngle) * radius1,
        y + this.p5.sin(a + halfAngle) * radius1)
    }
    this.p5.endShape(this.p5.CLOSE)
  } // END star
  
  static instance(p5: P5): P5Tools {
    if (Tools._instances == null)
      Tools._instances = new Map()
    if (!Tools._instances.has(p5))
      Tools._instances.set(p5, new Tools(p5))
    return Tools._instances.get(p5)!
  } // END instance
}

export const tools = Tools.instance
export default tools