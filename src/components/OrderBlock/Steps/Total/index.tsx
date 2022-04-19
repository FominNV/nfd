import { FC, useCallback, useEffect, useMemo } from "react"
import { useTypedSelector } from "store/selectors"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { getOrderStatuses, setOrder, setOrderStatus } from "store/order/actions"
import { IOrder } from "store/order/types"
import { format } from "date-fns"
import { setLoading } from "store/common/actions"
import Loading from "components/Loading"
import dataServiceItems from "./data"

import "./styles.scss"

const Total: FC = () => {
  const { order, car, rate, common } = useTypedSelector((state) => state)
  const params = useParams()
  const dispatch = useDispatch()

  const loadOrderStatuses = useCallback(async () => {
    dispatch(setLoading(true))
    await dispatch(getOrderStatuses())
    dispatch(setLoading(false))
  }, [dispatch])

  useEffect(() => {
    if (!order.status.all && params.id === "total") {
      loadOrderStatuses()
    }
  }, [order.status.all, params.id, loadOrderStatuses])

  useEffect(() => {
    if (order.status.all && params.id === "total") {
      order.status.all.map((elem) => {
        if (elem.name === "Новые") {
          dispatch(setOrderStatus(elem))
        }
      })
    }
  }, [order.status.all, params.id, dispatch])

  useEffect(() => {
    if (
      order.status.current
      && order.place.city
      && order.place.street
      && car.cars.current
      && order.extra
      && order.extra.color
      && order.extra
      && rate.current
      && order.price
    ) {
      const dataOrder: IOrder = {
        orderStatusId: order.status.current,
        cityId: order.place.city,
        pointId: order.place.street,
        carId: car.cars.current,
        color: order.extra.color,
        datefrom: order.date.from,
        dateTo: order.date.to,
        rateId: rate.current.rateTypeId.id,
        price: order.price,
        isFullTank: order.extra.isFullTank,
        isNeedChildChair: order.extra.isNeedChildChair,
        isRightWheel: order.extra.isRightWheel
      }

      dispatch(setOrder(dataOrder))
    }
  }, [
    order.status,
    car.cars,
    rate,
    order.date.from,
    order.date.to,
    order.extra,
    order.place.city,
    order.place.street,
    order.price,
    dispatch
  ])

  useEffect(() => {
    if (params.id === "ordered" && order.ordered) {
      dispatch(setLoading(false))
    }
  }, [params.id, order.ordered, dispatch])

  const addServices = useMemo<(
    JSX.Element | false)[]>(
    () =>
      dataServiceItems.map((elem) => {
        if (order.extra && order.extra[elem.id]) {
          return (
            <div
              className="Total__item"
              key={elem.id}
            >
              {elem.title} <span className="Total__item_text-light">{elem.value}</span>
            </div>
          )
        }
        return false
      }),
    [order.extra]
    )

  const availableDate = useMemo<"" | JSX.Element | false>(
    () =>
      order.date.from !== 0 && (
        <div className="Total__item">
          Доступна с{" "}
          <span className="Total__item_text-light">
            {format(new Date(order.date.from), "dd.MM.yyyy kk:mm")}
          </span>
        </div>
      ),
    [order.date.from]
  )

  const carNumber = useMemo<"" | JSX.Element | undefined>(
    () =>
      car.cars.current?.number && (
        <div className="Total__car-number">
          {car.cars.current?.number.replace(/(\d+)/g, " $1 ")}
        </div>
      ),
    [car.cars]
  )

  const content = useMemo<JSX.Element>(
    () =>
      (common.loading ? (
        <Loading />
      ) : (
        <>
          <div className="Total__model">{car.cars.current?.name}</div>
          {carNumber}
          {addServices}
          {availableDate}
        </>
      )),
    [addServices, availableDate, car.cars, carNumber, common.loading]
  )

  return <div className="Total">{content}</div>
}

export default Total
