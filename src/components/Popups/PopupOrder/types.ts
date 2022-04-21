import { IOrdered, IOrderStatus } from "store/order/types"

export type ChangeOrderStatusType = (order: IOrdered, status: IOrderStatus, path: string) => void
