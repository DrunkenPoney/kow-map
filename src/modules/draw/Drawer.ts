import { KonvaEventObject } from 'konva/types/Node'
import { Layer } from 'konva/types/Layer'
import { Vector2d } from 'konva/types/types'
import { History, IHistoryEntry } from '@/modules/history/History'

type KonvaEvent<E extends keyof GlobalEventHandlersEventMap> = KonvaEventObject<GlobalEventHandlersEventMap[E]>

export interface IDrawer {
  onMouseDown(ev: KonvaEvent<'mousedown'>): void
  onMouseMove(ev: KonvaEvent<'mousemove'>): void
  onMouseUp(ev: KonvaEvent<'mouseup'>): void
  destroy(): void
}

export interface IBaseDrawerParams {
  color: string
  stroke: number
}

export abstract class BaseDrawer<TParams extends IBaseDrawerParams = IBaseDrawerParams> implements IDrawer {
  protected readonly layer: Layer
  protected readonly params: Readonly<TParams>
  
  constructor(layer: Layer, params: Readonly<TParams>) {
    this.layer  = layer
    this.params = params
  }
  
  protected getPointerPosition(): Vector2d {
    return this.layer.getStage().getAbsoluteTransform()
      .copy().invert().point(this.layer.getStage().getPointerPosition()!)
  }
  
  protected fix(point: Vector2d): Vector2d {
    return this.layer.getStage().getAbsoluteTransform()
      .copy().invert().point(point)
  }
  
  abstract destroy(): void
  
  onMouseDown(ev: KonvaEventObject<MouseEvent>): void {}
  
  onMouseMove(ev: KonvaEventObject<MouseEvent>): void {}
  
  onMouseUp(ev: KonvaEventObject<MouseEvent>): void {}
  
  protected hist({ undo, redo }: IHistoryEntry): void {
    const layer = this.layer
    History.instance().append({
      undo() {
        undo()
        layer.draw()
      },
      redo() {
        redo()
        layer.draw()
      },
    })
  }
}