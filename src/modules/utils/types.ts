export type Mutable<T> = {
  -readonly [Key in keyof T]: T[Key]
}

export type Immutable<T> = {
  +readonly [Key in keyof T]: T[Key]
}