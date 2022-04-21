import { ICar } from "store/car/types"

export interface IOrderState {
  place: IOrderPlace
  car: Nullable<IOrderCar>
  extra: Nullable<IOrderExtra>
  date: Nullable<IOrderDate>
  total: Nullable<IOrderTotal>
  unlockedStep: IUnlockeOrderStep
  price: Nullable<number>
  order: Nullable<IOrder>
  ordered: Nullable<IOrdered>
  status: IOrderStatuses
}

export interface IOrderItem {
  name: string
  id: string
}

export interface IOrderPoint {
  address: string
  id: string
}

export interface IOrderPlace {
  city: Nullable<IOrderItem>
  street: Nullable<IOrderPoint>
}

export interface IOrderCar {
  id: string
  name: string
  priceMin: number
  priceMax: number
}

export interface IOrderDate {
  from: number
  to: number
}

export interface IOrderExtra {
  [index: string]: Nullable<string> | boolean
  color: string
  term: Nullable<string>
  tarrif: string
  isFullTank: boolean
  isNeedChildChair: boolean
  isRightWheel: boolean
}

export interface IOrderTotal {
  order: Nullable<string>
}

export interface IUnlockeOrderStep {
  [index: string]: boolean
  place: boolean
  car: boolean
  extra: boolean
  total: boolean
}

export interface IOrder {
  [index: string]: string | IOrderItem | IOrderPoint | ICar | number | boolean
  orderStatusId: IOrderItem
  cityId: IOrderItem
  pointId: IOrderPoint
  carId: ICar
  color: string
  datefrom: number
  dateTo: number
  rateId: string
  price: number
  isFullTank: boolean
  isNeedChildChair: boolean
  isRightWheel: boolean
}

export interface IOrdered extends IOrder {
  createdAt: number
  id: string
}

export interface IOrderStatus {
  name: string
  id: string
}

export interface IOrderStatuses {
  [index: string]: Nullable<IOrderStatus[]> | Nullable<IOrderStatus>
  all: Nullable<IOrderStatus[]>
  new: Nullable<IOrderStatus>
  confirm: Nullable<IOrderStatus>
  cancel: Nullable<IOrderStatus>
}

export type OrderDispatch<T> = (value: T) => OrderAction
export type SetLockStepType = (key: keyof IUnlockeOrderStep, lock: boolean) => OrderAction
export type SetOrderStatusType = (key: keyof IOrderStatuses, status: IOrderStatus) => OrderAction

export enum OrderActionTypes {
  SET_CITY = "SET_CITY",
  SET_STREET = "SET_STREET",
  SET_ORDER_CAR = "SET_ORDER_CAR",
  SET_ORDER_EXTRA = "SET_ORDER_EXTRA",
  SET_LOCK_STEP = "SET_LOCK_STEP",
  SET_ORDER_DATE = "SET_ORDER_DATE",
  SET_ORDER_PRICE = "SET_ORDER_PRICE",
  SET_ORDER = "SET_ORDER",
  SET_ORDERED = "SET_ORDERED",
  POST_ORDER = "POST_ORDER",
  GET_ORDER = "GET_ORDER",
  GET_ORDER_STATUSES = "GET_ORDER_STATUSES",
  SET_ORDER_STATUS = "SET_ORDER_STATUS"
}

type SetCityAction = {
  type: OrderActionTypes.SET_CITY
  payload: { city: Nullable<IOrderItem> }
}

type SetStreetAction = {
  type: OrderActionTypes.SET_STREET
  payload: { street: Nullable<IOrderPoint> }
}

type SetOrderCarAction = {
  type: OrderActionTypes.SET_ORDER_CAR
  payload: { car: Nullable<IOrderCar> }
}

type SetOrderExtraAction = {
  type: OrderActionTypes.SET_ORDER_EXTRA
  payload: { extra: Nullable<IOrderExtra> }
}

type SetLockStepAction = {
  type: OrderActionTypes.SET_LOCK_STEP
  payload: { key: keyof IUnlockeOrderStep; lock: boolean }
}

type SetOrderDateAction = {
  type: OrderActionTypes.SET_ORDER_DATE
  payload: { date: Nullable<IOrderDate> }
}

type SetPriceAction = {
  type: OrderActionTypes.SET_ORDER_PRICE
  payload: { price: Nullable<number> }
}

type SetOrderAction = {
  type: OrderActionTypes.SET_ORDER
  payload: { order: Nullable<IOrder> }
}

type SetOrderedAction = {
  type: OrderActionTypes.SET_ORDERED
  payload: { ordered: Nullable<IOrdered> }
}

type PostOrderAction = {
  type: OrderActionTypes.POST_ORDER
  payload: { ordered: Nullable<IOrdered> }
}

type GetOrderAction = {
  type: OrderActionTypes.GET_ORDER
  payload: { ordered: IOrdered }
}

type GetOrderStatusesAction = {
  type: OrderActionTypes.GET_ORDER_STATUSES
  payload: { statuses: IOrderStatus[] }
}

type SetOrderStatusAction = {
  type: OrderActionTypes.SET_ORDER_STATUS
  payload: { key: keyof IOrderStatuses; status: IOrderStatus }
}

export type OrderAction =
  | SetCityAction
  | SetStreetAction
  | SetOrderCarAction
  | SetLockStepAction
  | SetOrderExtraAction
  | SetPriceAction
  | SetOrderDateAction
  | SetOrderAction
  | SetOrderedAction
  | PostOrderAction
  | GetOrderAction
  | GetOrderStatusesAction
  | SetOrderStatusAction
