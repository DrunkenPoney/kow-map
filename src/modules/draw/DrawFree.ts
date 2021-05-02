import { BaseDrawer, IBaseDrawerParams, IDrawer } from '@/modules/draw/Drawer'
import Konva from 'konva'
import { Line } from 'konva/types/shapes/Line'
import { distance } from '@/modules/utils/math'
import { KonvaEventObject } from 'konva/types/Node'

interface IDrawFreeParams extends IBaseDrawerParams {
  smoothness: number
}

export class DrawFree extends BaseDrawer<IDrawFreeParams> implements IDrawer {
  protected line: Line | null = null
  
  onMouseDown(ev: KonvaEventObject<MouseEvent>): void {
    if (ev.target instanceof Konva.Shape) return
    const layer    = this.layer
    const { x, y } = this.getPointerPosition()
    const line     = this.line = new Konva.Line({
      points: [ x, y ],
      stroke: this.params.color,
      strokeWidth: this.params.stroke,
      lineCap: 'round',
      lineJoin: 'round',
      tension: 0.5,
      draggable: true,
    })
    layer.add(line)
    this.hist({
      undo: () => line.remove(),
      redo: () => layer.add(line),
    })
    
    const pos = {...line.position()}
    line.on('dragend', () => {
      const nPos = { ...line.position() }
      this.hist({
        undo: () => line.position(pos),
        redo: () => line.position(nPos),
      })
    })
  }
  
  onMouseMove(): void {
    if (this.line != null) {
      const { x, y } = this.getPointerPosition()
      let points     = this.line.points()
      if (points[points.length - 1] != x || points[points.length - 2] != y) {
        points = points.concat([ x, y ])
        this.line.points(points)
        this.layer.batchDraw()
      }
    }
  }
  
  onMouseUp(): void {
    if (this.line != null) {
      const { x, y } = this.getPointerPosition()
      this.line.points(this.smooth(this.line.points().concat([ x, y ])))
      this.layer.draw()
      this.line = null
    }
  }
  
  destroy(): void {
    this.onMouseUp()
  }
  
  private smooth(points: Array<number>): Array<number> {
    if (points.length % 2) throw 'Error: odd length'
    if (points.length <= 4) return points
    
    let lastPair = [ points.shift(), points.shift() ] as [ number, number ]
    return points.reduce((arr, p, idx) => {
      let pair = [ p, points[idx + 1] ] as [ number, number ]
      if (idx % 2) return arr
      if (idx === points.length - 2) return arr.concat(lastPair = pair)
      if (this.params.smoothness < distance(lastPair, pair)) return arr.concat(lastPair = pair)
      return arr
    }, lastPair as number[])
  }
}