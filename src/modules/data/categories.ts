export type Category = {
  name: string
  color: Array<number>
  disabled: boolean
}

export const farm: Category = {
  name: 'Farm',
  color: [0, 150, 0],
  disabled: false
}

export const war: Category = {
  name: 'War',
  color: [190, 0, 0],
  disabled: false
}

export const research: Category = {
  name: 'Research',
  color: [33, 99, 255],
  disabled: false
}

export const construct: Category = {
  name: 'Construction',
  color: [33, 230, 187],
  disabled: false
}

export const unitProd: Category = {
  name: 'Unit Production',
  color: [235, 160, 10],
  disabled: false
}

export default {
  farm,
  war,
  research,
  construct,
  unitProd
}