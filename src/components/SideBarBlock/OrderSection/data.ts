import { PATHS } from "routes/consts"
import { IOrderButton } from "./types"

const dataOrderButtons: IOrderButton[] = [
  {
    id: "place",
    name: "Выбрать модель",
    path: PATHS.ORDER_CAR,
    unlockStep: "car"
  },
  {
    id: "car",
    name: "Дополнительно",
    path: PATHS.ORDER_EXTRA,
    unlockStep: "extra"
  },
  {
    id: "extra",
    name: "Итого",
    path: PATHS.ORDER_TOTAL,
    unlockStep: "total"
  },
  {
    id: "total",
    name: "Заказать",
    path: PATHS.ORDER_TOTAL,
    unlockStep: "total"
  },
  {
    id: "canceled",
    name: "Оформить новый",
    path: PATHS.ORDER_PLACE,
    unlockStep: "place"
  }
]

export default dataOrderButtons
