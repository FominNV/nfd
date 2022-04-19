import useFetch from "hooks/useFetch"
import { FetchMethod, URLS } from "hooks/useFetch/types"
import { Dispatch } from "react"
import {
  IOrder,
  IOrderCar,
  IOrderDate,
  IOrdered,
  IOrderExtra,
  IOrderItem,
  IOrderPoint,
  IOrderStatus,
  OrderAction,
  OrderActionTypes,
  OrderDispatch,
  SetLockStepType
} from "./types"

export const setPlaceCity: OrderDispatch<Nullable<IOrderItem>> = (city) => {
  return {
    type: OrderActionTypes.SET_CITY,
    payload: { city }
  }
}

export const setPlaceStreet: OrderDispatch<Nullable<IOrderPoint>> = (street) => {
  return {
    type: OrderActionTypes.SET_STREET,
    payload: { street }
  }
}

export const setOrderCar: OrderDispatch<Nullable<IOrderCar>> = (car) => {
  return {
    type: OrderActionTypes.SET_ORDER_CAR,
    payload: { car }
  }
}

export const setOrderExtra: OrderDispatch<Nullable<IOrderExtra>> = (extra) => {
  return {
    type: OrderActionTypes.SET_ORDER_EXTRA,
    payload: { extra }
  }
}

export const setLockOrderStep: SetLockStepType = (step, lock) => {
  return {
    type: OrderActionTypes.SET_LOCK_STEP,
    payload: { step, lock }
  }
}

export const setOrderPrice: OrderDispatch<Nullable<number>> = (price) => {
  return {
    type: OrderActionTypes.SET_ORDER_PRICE,
    payload: { price }
  }
}

export const setOrderDate: OrderDispatch<IOrderDate> = (date) => {
  return {
    type: OrderActionTypes.SET_ORDER_DATE,
    payload: { date }
  }
}

export const setOrder: OrderDispatch<Nullable<IOrder>> = (order) => {
  return {
    type: OrderActionTypes.SET_ORDER,
    payload: { order }
  }
}

export const postOrder = (fetchData: IOrder) => async (dispatch: Dispatch<OrderAction>) => {
  const fetchOptions = {
    method: FetchMethod.POST,
    headers: {
      "X-Api-Factory-Application-Id": process.env.REACT_APP_API_KEY as string,
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(fetchData)
  }

  const { data, error } = await useFetch(URLS.ORDER_URL, fetchOptions)

  if (error) {
    throw new Error("Can't post order...")
  }

  dispatch({
    type: OrderActionTypes.POST_ORDER,
    payload: { ordered: data?.data as IOrdered }
  })
}

export const getOrder = (orderId: string) => async (dispatch: Dispatch<OrderAction>) => {
  const fetchOptions = {
    method: FetchMethod.GET,
    headers: {
      "X-Api-Factory-Application-Id": process.env.REACT_APP_API_KEY as string
    }
  }
  const url = URLS.ORDER_URL + orderId

  const { data, error } = await useFetch(url, fetchOptions)

  if (error) {
    throw new Error("Can't order...")
  }

  dispatch({
    type: OrderActionTypes.GET_ORDER,
    payload: { ordered: data?.data as IOrdered }
  })
}

export const getOrderStatuses = () => async (dispatch: Dispatch<OrderAction>) => {
  const fetchOptions = {
    method: FetchMethod.GET,
    headers: {
      "X-Api-Factory-Application-Id": process.env.REACT_APP_API_KEY as string
    }
  }

  const { data, error } = await useFetch(URLS.ORDER_STATUS_URL, fetchOptions)

  if (error) {
    throw new Error("Can't get statuses...")
  }

  dispatch({
    type: OrderActionTypes.GET_ORDER_STATUSES,
    payload: { statuses: data?.data as IOrderStatus[] }
  })
}

export const setOrderStatus: OrderDispatch<IOrderStatus> = (status) => {
  return {
    type: OrderActionTypes.SET_ORDER_STATUS,
    payload: { status }
  }
}
