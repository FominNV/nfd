import { PATHS } from "routes/consts"
import { IOrderExtraService, ISideBarButton } from "./types"

export const dataSideBarButton: ISideBarButton[] = [
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
    id: "ordered",
    name: "Отменить",
    path: PATHS.ORDER_ORDERED,
    unlockStep: "place"
  },
  {
    id: "canceled",
    name: "Оформить новый",
    path: PATHS.ORDER_PLACE,
    unlockStep: "place"
  }
]

export const dataOrderExtra: IOrderExtraService[] = [
  {
    id: "isFullTank",
    title: "Полный бак",
    value: "Да"
  },
  {
    id: "isNeedChildChair",
    title: "Детское кресло",
    value: "Да"
  },
  {
    id: "isRightWheel",
    title: "Правый руль",
    value: "Да"
  }
]
