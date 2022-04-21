import { FC, MouseEvent, useCallback } from "react"
import { useTypedSelector } from "store/selectors"
import { useDispatch } from "react-redux"
import { setOrderCar } from "store/order/actions"
import useFormatNumber from "hooks/useFormatNumber"

import classNames from "classnames"
import { IOrderCarCardProps } from "./types"

import "./styles.scss"

const OrderCarCard: FC<IOrderCarCardProps> = ({ id, name, priceMin, priceMax, img }) => {
  const { car } = useTypedSelector((state) => state.order)
  const dispatch = useDispatch()

  const setCar = useCallback<EventFunc<MouseEvent>>(() => {
    dispatch(setOrderCar({ id, name, priceMin, priceMax }))
  }, [dispatch, id, name, priceMin, priceMax])

  const cardClassName = classNames("OrderCarCard", { OrderCarCard_active: id === car?.id })
  const price = `${useFormatNumber(priceMin)} - ${useFormatNumber(priceMax)} ₽`

  return (
    <button
      className={cardClassName}
      onClick={setCar}
    >
      <div className="OrderCarCard__text-wrap">
        <div className="OrderCarCard__name">{name}</div>
        <div className="OrderCarCard__price">{price}</div>
      </div>

      <div className="OrderCarCard__img-wrap">
        <img
          src={img}
          alt="car"
          className="OrderCarCard__img"
        />
      </div>
    </button>
  )
}

export default OrderCarCard
