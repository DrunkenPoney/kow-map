import { reactive } from 'vue'

export interface IHistoryEntry {
  undo(): void
  redo(): void
}

export interface IHistory {
  readonly entries: ReadonlyArray<IHistoryEntry>
  canUndo: boolean
  canRedo: boolean
  append(entry: IHistoryEntry): void
  undo(): boolean
  redo(): boolean
}

export const MAX_HISTORY_LENGTH = 100

export class History implements IHistory {
  private static _instance: History
  private readonly done: Array<IHistoryEntry>
  private readonly undone: Array<IHistoryEntry>
  
  private constructor() {
    this.done = reactive([])
    this.undone = reactive([])
  }
  
  get entries(): ReadonlyArray<IHistoryEntry> { return this.done }
  
  get canUndo(): boolean { return this.done.length > 0 }
  get canRedo(): boolean { return this.undone.length > 0 }
  
  append(entry: IHistoryEntry): void {
    this.done.push(entry)
    this.undone.splice(0)
    if (this.done.length > MAX_HISTORY_LENGTH)
      this.done.shift()
  }
  
  redo(): boolean {
    let entry = this.undone.pop()
    if (entry != null) {
      entry.redo()
      this.done.push(entry)
      return true
    }
    return false;
  }
  
  undo(): boolean {
    let entry = this.done.pop()
    if (entry != null) {
      entry.undo()
      this.undone.push(entry)
      return true
    }
    return false;
  }
  
  static instance(): IHistory {
    if (this._instance == null)
      this._instance = new History()
    return this._instance
  }
}