import { FC, MouseEvent, useCallback, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { useTypedSelector } from "store/selectors"
import { useDispatch } from "react-redux"
import { postOrder } from "store/order/actions"
import { setLoading } from "store/common/actions"
import { ButtonBgColor } from "components/Button/types"
import useFormatNumber from "hooks/useFormatNumber"
import Button from "components/Button"
import classNames from "classnames"
import PopupOrder from "components/Popups/PopupOrder"
import useTerm from "hooks/useTerm"
import OrderPoint from "../OrderBlock/OrderPoint"
import { dataOrderExtra, dataSideBarButton } from "./data"

import "./styles.scss"

const SideBar: FC = () => {
  const { order } = useTypedSelector((state) => state)
  const [showOrderPopup, setShowOrderPopup] = useState<boolean>(false)
  const params = useParams()
  const dispatch = useDispatch()

  const onClickHandler = useCallback<EventFunc<MouseEvent>>(() => {
    setLoading(true)
    setShowOrderPopup((prev) => !prev)
    return order.order && dispatch(postOrder(order.order))
  }, [order.order, dispatch])

  const orderPlace = useMemo<JSX.Element | null | "">(() => {
    const city =
      params.id !== "ordered"
        ? order.place.city && order.place.city.name
        : order.ordered && order.ordered.cityId.name
    const street =
      params.id !== "ordered"
        ? order.place.street && order.place.street.address
        : order.ordered && order.ordered.pointId.address
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
  }, [params.id, order.place.city, order.place.street, order.ordered])

  const orderCar = useMemo<JSX.Element | null>(() => {
    const carModel =
      params.id !== "ordered" ? order.car?.name : order.ordered && order.ordered.carId.name

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
  }, [params.id, order.car, order.ordered])

  const carColor = useMemo<JSX.Element | null>(() => {
    const orderedColor = params.id === "ordered" && order.ordered && order.ordered.color
    const orderColor = order.extra && order.extra.color
    if (orderedColor || orderColor) {
      return (
        <OrderPoint
          title="Цвет"
          key="order_color"
          noWrapValue={orderedColor || orderColor || ""}
        />
      )
    }
    return null
  }, [params.id, order.ordered, order.extra])

  const orderPeriod = useMemo<JSX.Element | null>(() => {
    const orderedTerm =
      params.id === "ordered" &&
      order.ordered &&
      useTerm(order.ordered.createdAt, order.ordered.dateTo)

    const orderTerm = order.extra && order.extra.term
    if (orderedTerm || orderTerm) {
      return (
        <OrderPoint
          title="Длительность аренды"
          key="order_term"
          noWrapValue={orderedTerm || orderTerm || ""}
        />
      )
    }
    return null
  }, [params.id, order.ordered, order.extra])

  const orderExtraServices = useMemo<(JSX.Element | false)[] | null>(() => {
    const dataOrder = params.id === "ordered" ? order.ordered : order.extra

    return (
      dataOrder &&
      dataOrderExtra.map((elem, index) => {
        if (dataOrder[elem.id]) {
          return (
            <OrderPoint
              title={elem.title}
              key={`order_extra_${index}`}
              noWrapValue={elem.value}
            />
          )
        }
        return false
      })
    )
  }, [params.id, order.ordered, order.extra])

  const price = useMemo<JSX.Element | null>(() => {
    const orderedPrice = params.id === "ordered" && order.ordered && `${order.ordered.price} ₽`

    const orderPrice = order.price
      ? `${order.price} ₽`
      : order.car &&
        `от ${useFormatNumber(order.car.priceMin)} до ${useFormatNumber(order.car.priceMax)} ₽`
    if (orderPrice) {
      return (
        <>
          <span
            className="SideBar__total-price_price"
            key="order_price"
          >
            Цена:&nbsp;
          </span>
          {orderedPrice || orderPrice}
        </>
      )
    }
    return null
  }, [params.id, order.ordered, order.car, order.price])

  const orderButtons = useMemo<JSX.Element[]>(() => {
    return dataSideBarButton.map((elem, index) => {
      const buttonClassName = classNames("SideBar__btn", {
        SideBar__btn_active: params.id === elem.id
      })

      const disabled = !order.unlockedStep[elem.unlockStep]
      const backgroundColor = elem.name === "Отменить" ? ButtonBgColor.PURPLE : ButtonBgColor.GREEN
      const onclick =
        elem.name === "Заказать" || elem.name === "Отменить" ? onClickHandler : undefined

      return (
        <div
          className={buttonClassName}
          key={elem.id + index}
        >
          <Button
            name={elem.name}
            bgColor={backgroundColor}
            disabled={disabled}
            key={elem.id + index}
            navigatePath={elem.path}
            onClick={onclick}
          />
        </div>
      )
    })
  }, [order, params.id, onClickHandler])

  const orderPopup = useMemo(
    () => showOrderPopup && <PopupOrder onClick={onClickHandler} />,
    [showOrderPopup, onClickHandler]
  )

  return (
    <div className="SideBar">
      {orderPopup}
      <h3 className="SideBar__title">Ваш заказ:</h3>

      <div className="SideBar__order-points">
        {orderPlace}
        {orderCar}
        {carColor}
        {orderPeriod}
        {orderExtraServices}
      </div>

      <p className="SideBar__total-price">{price}</p>

      <div className="SideBar__btn-wrap">{orderButtons}</div>
    </div>
  )
}

export default SideBar
