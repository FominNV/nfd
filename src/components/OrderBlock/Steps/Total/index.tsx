import { FC, ReactNode, useEffect, useMemo } from "react"
import { useTypedSelector } from "store/selectors"
import { useDispatch } from "react-redux"
import { setOrder } from "store/order/actions"
import { IOrder } from "store/order/types"
import { format } from "date-fns"
import dataServiceItems from "./data"

import "./styles.scss"

const Total: FC = () => {
  const { status, place, extra, date, price } = useTypedSelector((state) => state.order)
  const { cars } = useTypedSelector((state) => state.car)
  const { rate } = useTypedSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    if (
      status.new &&
      place.city &&
      place.street &&
      cars.current &&
      extra &&
      extra.color &&
      date &&
      rate.current &&
      price
    ) {
      const dataOrder: IOrder = {
        orderStatusId: status.new,
        cityId: place.city,
        pointId: place.street,
        carId: cars.current,
        color: extra.color,
        datefrom: date.from,
        dateTo: date.to,
        rateId: rate.current.rateTypeId.id,
        price,
        isFullTank: extra.isFullTank,
        isNeedChildChair: extra.isNeedChildChair,
        isRightWheel: extra.isRightWheel
      }

      dispatch(setOrder(dataOrder))
    }
  }, [status, cars, rate, date, extra, place.city, place.street, price, dispatch])

  const addServices = useMemo<ReactNode>(
    () =>
      dataServiceItems.map((elem) => {
        if (extra && extra[elem.id]) {
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
    [extra]
  )

  const availableDate = useMemo<ReactNode>(
    () =>
      date && (
        <div className="Total__item">
          Доступна с{" "}
          <span className="Total__item_text-light">
            {format(new Date(date.from), "dd.MM.yyyy kk:mm")}
          </span>
        </div>
      ),
    [date]
  )

  const carNumber = useMemo<ReactNode>(
    () =>
      cars.current?.number && (
        <div className="Total__car-number">
          {cars.current?.number.replace(/(\d+)/g, " $1 ")}
        </div>
      ),
    [cars]
  )

  const carImage = useMemo<ReactNode>(
    () =>
      cars.current?.thumbnail.path && (
        <img
          src={cars.current?.thumbnail.path}
          className="Total__car__img"
          alt="car_image"
        />
      ),
    [cars]
  )

  return (
    <div className="Total">
      <div className="Total__car">
        <div className="Total__car__model">{cars.current?.name}</div>
        {carImage}
      </div>
      {carNumber}
      {addServices}
      {availableDate}
    </div>
  )
}

export default Total
