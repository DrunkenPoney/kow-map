import categories, { Category } from '@/modules/data/categories'

export type Boost = {
  name: string
  cat: Category
  value: number
}

export type BoostFunc = (value: number) => Boost

export const gather: BoostFunc = (value = 0) =>
  ( { name: 'Gathering Speed', cat: categories.farm, value } )

export const march: BoostFunc = (value = 0) =>
  ( { name: 'March Speed', cat: categories.war, value } )

export const output: BoostFunc = (value = 0) =>
  ( { name: 'Total Resource Output', cat: categories.farm, value } )

export const health: BoostFunc = (value = 0) =>
  ( { name: 'Troop Health', cat: categories.war, value } )

export const xp: BoostFunc = (value = 0) =>
  ( { name: 'Officer XP gained', cat: categories.war, value } )

export const research: BoostFunc = (value = 0) =>
  ( { name: 'Research Speed', cat: categories.research, value } )

export const defense: BoostFunc = (value = 0) =>
  ( { name: 'Troop Defense', cat: categories.war, value } )

export const attack: BoostFunc = (value = 0) =>
  ( { name: 'Troop Attack', cat: categories.war, value } )

export const unitProd: BoostFunc = (value = 0) =>
  ( { name: 'Unit Production Speed', cat: categories.unitProd, value } )

export const construct: BoostFunc = (value = 0) =>
  ( { name: 'Construction Speed', cat: categories.unitProd, value } )

export const rallyAttack: BoostFunc = (value = 0) =>
  ( { name: 'Rally Troop Attack', cat: categories.war, value } )

export const ap: BoostFunc = (value = 0) =>
  ( { name: 'Action Point Recovery', cat: categories.war, value } )

export const repair: BoostFunc = (value = 0) =>
  ( { name: 'Unit Repair Speed', cat: categories.war, value } )

export default {
  gather,
  march,
  output,
  health,
  xp,
  research,
  defense,
  attack,
  unitProd,
  construct,
  rallyAttack,
  ap,
  repair
}