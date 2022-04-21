import Place from "components/OrderBlock/Steps/Place"
import Car from "components/OrderBlock/Steps/Car"
import Extra from "components/OrderBlock/Steps/Extra"
import Total from "components/OrderBlock/Steps/Total"
import Ordered from "components/OrderBlock/Steps/Ordered"
import Canceled from "components/OrderBlock/Steps/Canceled"
import { IDataStatusItem, IOrderStep } from "./types"

export const dataOrderSteps: IOrderStep[] = [
  {
    id: "place",
    component: <Place />
  },
  {
    id: "car",
    component: <Car />
  },
  {
    id: "extra",
    component: <Extra />
  },
  {
    id: "total",
    component: <Total />
  },
  {
    id: "ordered",
    component: <Ordered />
  },
  {
    id: "canceled",
    component: <Canceled />
  }
]

export const dataOrderStatuses: IDataStatusItem[] = [
  {
    key: "new",
    status: "Новые"
  },
  {
    key: "confirm",
    status: "Подтвержденные"
  },
  {
    key: "cancel",
    status: "Отмененые"
  }
]
