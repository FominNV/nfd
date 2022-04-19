import { MouseEvent } from "react"
import { IOrder, IOrderStatus } from "store/order/types"

export type ChangeOrderStatusType = (order: IOrder, status: IOrderStatus) => void

export interface IPopupOrderProps {
  onClick: EventFunc<MouseEvent>
}
