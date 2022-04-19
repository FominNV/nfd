import { ICheckbox } from "components/OrderBlock/OrderCheckbox/types"
import { IRadio } from "components/OrderBlock/OrderRadio/types"

export const dataTarrif: IRadio[] = [
  {
    id: "minute",
    label: "Поминутно, 7₽/мин"
  },
  {
    id: "day",
    label: "На сутки, 1999 ₽/сутки"
  }
]

export const dataAddService: ICheckbox[] = [
  {
    id: "full_tank",
    label: "Полный бак, 500р"
  },
  {
    id: "child_chair",
    label: "Детское кресло, 200р"
  },
  {
    id: "right_hand_drive",
    label: "Правый руль, 1600р"
  }
]
