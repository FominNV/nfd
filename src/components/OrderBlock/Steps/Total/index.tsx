import { FC, ReactNode, useCallback, useEffect, useMemo } from "react"
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

  useEffect(() => {
    if (
      order.status.new &&
      order.place.city &&
      order.place.street &&
      car.cars.current &&
      order.extra &&
      order.extra.color &&
      order.date &&
      order.extra &&
      rate.current &&
      order.price
    ) {
      const dataOrder: IOrder = {
        orderStatusId: order.status.new,
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
    order.date,
    order.extra,
    order.place.city,
    order.place.street,
    order.price,
    dispatch
  ])

  const addServices = useMemo<ReactNode>(
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

  const availableDate = useMemo<ReactNode>(
    () =>
      order.date && (
        <div className="Total__item">
          Доступна с{" "}
          <span className="Total__item_text-light">
            {format(new Date(order.date.from), "dd.MM.yyyy kk:mm")}
          </span>
        </div>
      ),
    [order.date]
  )

  const carNumber = useMemo<ReactNode>(
    () =>
      car.cars.current?.number && (
        <div className="Total__car-number">
          {car.cars.current?.number.replace(/(\d+)/g, " $1 ")}
        </div>
      ),
    [car.cars]
  )

  const carImage = useMemo<ReactNode>(
    () =>
      car.cars.current?.thumbnail.path && (
        <img
          src={car.cars.current?.thumbnail.path}
          className="Total__car__img"
          alt="car_image"
        />
      ),
    [car.cars]
  )

  return (
    <div className="Total">
      <div className="Total__car">
        <div className="Total__car__model">{car.cars.current?.name}</div>
        {carImage}
      </div>
      {carNumber}
      {addServices}
      {availableDate}
    </div>
  )
}

export default Total
