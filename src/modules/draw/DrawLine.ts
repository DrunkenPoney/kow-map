import { IDrawer } from '@/modules/draw/Drawer'
import { DrawFree } from '@/modules/draw/DrawFree'

export class DrawLine extends DrawFree implements IDrawer {
  onMouseMove(): void {
    if (this.line != null) {
      const { x, y } = this.getPointerPosition()
      this.line.points(this.line.points().slice(0, 2).concat([x, y]))
      this.layer.batchDraw()
    }
  }
  
  onMouseUp(): void {
    if (this.line != null) {
      this.onMouseMove()
      this.line = null
    }
  }
}