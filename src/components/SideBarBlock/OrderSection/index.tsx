import { FC, MouseEvent, ReactNode, useCallback, useMemo } from "react"
import { useParams } from "react-router-dom"
import { useTypedSelector } from "store/selectors"
import { useDispatch } from "react-redux"
import { setLoading, showOrderPopup } from "store/common/actions"
import { postOrder } from "store/order/actions"
import OrderPoint from "components/OrderBlock/OrderPoint"
import Button from "components/Button"
import classNames from "classnames"
import { IOrder, IOrderExtra } from "store/order/types"
import { ButtonBgColor } from "components/Button/types"
import useFormatNumber from "hooks/useFormatNumber"
import dataOrderButtons from "./data"
import { dataOrderExtra } from "../SideBar/data"

import "./styles.scss"

const OrderSection: FC = () => {
  const { order, place, car, extra, price, unlockedStep } = useTypedSelector((state) => state.order)
  const params = useParams()
  const dispatch = useDispatch()

  const fetchNewOrder = useCallback<EventFunc<MouseEvent>>(async () => {
    dispatch(setLoading(true))
    dispatch(showOrderPopup(true))
    await dispatch(postOrder(order as IOrder))
    dispatch(setLoading(false))
  }, [order, dispatch])

  const orderPlace = useMemo<ReactNode>(() => {
    const city = place.city && place.city.name
    const street = place.street && place.street.address
    if (city && street) {
      return (
        <OrderPoint
          title="Пункт выдачи"
          key="order_place"
          value={`${city},`}
          noWrapValue={street || ""}
        />
      )
    }
    return null
  }, [place.city, place.street])

  const orderCar = useMemo<ReactNode>(() => {
    const carModel = car && car.name
    if (carModel) {
      return (
        <OrderPoint
          title="Модель"
          key="order_model"
          noWrapValue={carModel}
        />
      )
    }
    return null
  }, [car])

  const carColor = useMemo<ReactNode>(() => {
    const orderColor = extra && extra.color
    if (orderColor) {
      return (
        <OrderPoint
          title="Цвет"
          key="order_color"
          noWrapValue={orderColor}
        />
      )
    }
    return null
  }, [extra])

  const orderTerm = useMemo<ReactNode>(() => {
    const term = extra && extra.term && extra.term
    if (term) {
      return (
        <OrderPoint
          title="Длительность аренды"
          key="order_term"
          noWrapValue={term}
        />
      )
    }
    return null
  }, [extra])

  const orderExtraServices = useMemo<ReactNode>(
    () =>
      extra &&
      dataOrderExtra.map((elem, index) => {
        const orderExtraData = extra as IOrderExtra
        if (orderExtraData[elem.id]) {
          return (
            <OrderPoint
              title={elem.title}
              key={`order_extra_${index}`}
              noWrapValue={elem.value}
            />
          )
        }
        return null
      }),
    [extra]
  )

  const orderButtons = useMemo<ReactNode>(
    () =>
      dataOrderButtons.map((elem, index) => {
        const buttonClassName = classNames("SideBarSection__btn", {
          SideBarSection__btn_active: params.id === elem.id
        })
        const disabled = !unlockedStep[elem.unlockStep]
        const onClick = elem.name === "Заказать" ? fetchNewOrder : undefined

        return (
          <div className={buttonClassName}>
            <Button
              name={elem.name}
              bgColor={ButtonBgColor.GREEN}
              disabled={disabled}
              key={elem.id + index}
              navigatePath={elem.path}
              onClick={onClick}
            />
          </div>
        )
      }),
    [params.id, unlockedStep, fetchNewOrder]
  )

  const orderPrice = useMemo<ReactNode>(() => {
    const currentPrice = price
      ? `${price} ₽`
      : car && `от ${useFormatNumber(car.priceMin)} до ${useFormatNumber(car.priceMax)} ₽`

    if (currentPrice) {
      return (
        <>
          <span
            className="SideBarSection__total-price_price"
            key="order_price"
          >
            Цена:&nbsp;
          </span>
          {currentPrice}
        </>
      )
    }
    return null
  }, [car, price])

  return (
    <section className="SideBarSection">
      <div className="SideBarSection__order-points">
        {orderPlace}
        {orderCar}
        {carColor}
        {orderTerm}
        {orderExtraServices}
      </div>

      <p className="SideBarSection__total-price">{orderPrice}</p>

      <div className="SideBarSection__btn-wrap">{orderButtons}</div>
    </section>
  )
}

export default OrderSection
