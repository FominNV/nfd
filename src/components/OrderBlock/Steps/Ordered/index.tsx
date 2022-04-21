import { FC, ReactNode, useMemo } from "react"
import { useParams } from "react-router-dom"
import { useTypedSelector } from "store/selectors"
import { format } from "date-fns"
import Loading from "components/Loading"
import dataServiceItems from "../Total/data"

import "./styles.scss"

const Ordered: FC = () => {
  const { ordered } = useTypedSelector((state) => state.order)
  const { loading } = useTypedSelector((state) => state.common)
  const params = useParams()

  const addServices = useMemo<ReactNode>(
    () =>
      dataServiceItems.map((elem) => {
        if (ordered && ordered[elem.id]) {
          return (
            <div
              className="Ordered__item"
              key={elem.id}
            >
              {elem.title} <span className="Ordered__item_text-light">{elem.value}</span>
            </div>
          )
        }
        return false
      }),
    [ordered]
  )

  const availableDate = useMemo<ReactNode>(
    () =>
      ordered &&
      params.id === "ordered" && (
        <div className="Ordered__item">
          Доступна с{" "}
          <span className="Ordered__item_text-light">
            {format(new Date(ordered.createdAt), "dd.MM.yyyy kk:mm")}
          </span>
        </div>
      ),
    [ordered, params.id]
  )

  const carNumber = useMemo<ReactNode>(
    () =>
      ordered?.carId.number && (
        <div className="Total__car-number">{ordered?.carId.number.replace(/(\d+)/g, " $1 ")}</div>
      ),
    [ordered]
  )

  const carImage = useMemo<ReactNode>(
    () =>
      ordered?.carId?.thumbnail.path && (
        <img
          src={ordered?.carId?.thumbnail.path}
          className="Ordered__car__img"
          alt="car_image"
        />
      ),
    [ordered?.carId?.thumbnail.path]
  )

  const content = useMemo<ReactNode>(
    () =>
      (loading ? (
        <Loading />
      ) : (
        <>
          <div className="Ordered__order-text">Ваш заказ подтверждён</div>
          <div className="Ordered__car">
            <div className="Ordered__car__model">{ordered?.carId.name}</div>
            {carImage}
          </div>
          {carNumber}
          {addServices}
          {availableDate}
        </>
      )),
    [loading, carImage, ordered?.carId.name, addServices, availableDate, carNumber]
  )

  return <div className="Ordered">{content}</div>
}

export default Ordered
