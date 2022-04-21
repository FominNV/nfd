import { FC, MouseEvent, ReactNode, useCallback, useMemo } from "react"
import { useTypedSelector } from "store/selectors"
import { useDispatch } from "react-redux"
import { showOrderPopup } from "store/common/actions"
import OrderPoint from "components/OrderBlock/OrderPoint"
import Button from "components/Button"
import useTerm from "hooks/useTerm"
import { ButtonBgColor } from "components/Button/types"
import { IOrdered } from "store/order/types"
import { dataOrderExtra } from "../SideBar/data"

import "./styles.scss"

const OrderedSection: FC = () => {
  const { ordered } = useTypedSelector((state) => state.order)
  const dispatch = useDispatch()

  const onClickHandler = useCallback<EventFunc<MouseEvent>>(() => {
    dispatch(showOrderPopup(true))
  }, [dispatch])

  const orderedPlace = useMemo<ReactNode>(
    () => (
      <OrderPoint
        title="Пункт выдачи"
        key="order_place"
        value={`${ordered?.cityId.name},`}
        noWrapValue={ordered?.pointId.address}
      />
    ),
    [ordered]
  )

  const orderedCar = useMemo<ReactNode>(
    () => (
      <OrderPoint
        title="Модель"
        key="order_model"
        noWrapValue={ordered?.carId.name}
      />
    ),
    [ordered]
  )

  const orderedCarColor = useMemo<ReactNode>(
    () => (
      <OrderPoint
        title="Цвет"
        key="order_color"
        noWrapValue={ordered?.color}
      />
    ),
    [ordered]
  )

  const orderedTerm = useMemo<ReactNode>(() => {
    const term = useTerm(ordered?.createdAt as number, ordered?.dateTo as number)
    return (
      <OrderPoint
        title="Длительность аренды"
        key="order_term"
        noWrapValue={term}
      />
    )
  }, [ordered])

  const orderedExtraServices = useMemo<ReactNode>(
    () =>
      dataOrderExtra?.map((elem, index) => {
        const dataOrdered: IOrdered = ordered as IOrdered
        if (dataOrdered[elem.id]) {
          return (
            <OrderPoint
              title={elem.title}
              key={`order_extra_${index}`}
              noWrapValue={elem.value}
            />
          )
        }
        return false
      }),
    [ordered]
  )

  const orderedPrice = useMemo<ReactNode>(
    () => (
      <>
        <span
          className="SideBarSection__total-price_price"
          key="orderer_price"
        >
          Цена:&nbsp;
        </span>
        {ordered?.price as number} ₽
      </>
    ),
    [ordered]
  )

  return (
    <section className="SideBarSection">
      <div className="SideBarSection__order-points">
        {orderedPlace}
        {orderedCar}
        {orderedCarColor}
        {orderedTerm}
        {orderedExtraServices}
      </div>

      <p className="SideBarSection__total-price">{orderedPrice}</p>

      <div className="SideBarSection__btn-wrap">
        <div className="SideBarSection__btn SideBarSection__btn_active">
          <Button
            name="Отменить"
            bgColor={ButtonBgColor.PURPLE}
            key="ordered_btn"
            onClick={onClickHandler}
          />
        </div>
      </div>
    </section>
  )
}

export default OrderedSection
