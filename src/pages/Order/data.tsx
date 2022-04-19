import Place from "components/OrderBlock/Steps/Place"
import Car from "components/OrderBlock/Steps/Car"
import Extra from "components/OrderBlock/Steps/Extra"
import Total from "components/OrderBlock/Steps/Total"
import Ordered from "components/OrderBlock/Steps/Ordered"
import { IOrderStep } from "./types"

const dataOrderSteps: IOrderStep[] = [
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
    component: <Ordered />
  }
]

export default dataOrderSteps
