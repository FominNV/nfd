import { FC, useEffect, useMemo } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useTypedSelector } from "store/selectors"
import { useDispatch } from "react-redux"
import { getOrderStatuses, setOrderStatus } from "store/order/actions"
import OrderLayout from "layouts/OrderLayout"
import Container from "components/Container"
import SideBar from "components/SideBar"
import classNames from "classnames"
import { PATHS } from "routes/consts"
import dataOrderSteps from "./data"

import "./styles.scss"

const Order: FC = () => {
  const { place, ordered, status } = useTypedSelector((state) => state.order)
  const location = useLocation()
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const orderSteps = useMemo<JSX.Element[]>(() => (
    dataOrderSteps.map((elem, index) => {
      const blockClassName = classNames(
        "Order__step",
        { Order__step_active: params.id === elem.id }
      )
      // if (elem.id === "ordered") {
      //   blockClassName = classNames(
      //     "Order__step",
      //     { Order__step_active: params.id === ordered?.id }
      //   )
      // }

      return (
        <div
          className={blockClassName}
          key={elem.id + index}
        >
          {elem.component}
        </div>
      )
    })
  ), [params.id, ordered?.id])

  useEffect(() => {
    if (localStorage.getItem("nfd_ordered")) {
      navigate(PATHS.ORDER_ORDERED)
    } else if (location.pathname !== PATHS.ORDER_PLACE && !place.street) {
      navigate(PATHS.ORDER_PLACE)
    }
  }, [])

  useEffect(() => {
    if (ordered && ordered.dateTo < Date.now()) {
      localStorage.removeItem("nfd_ordered")
      navigate(PATHS.ORDER_PLACE)
    }
  }, [ordered, navigate])

  useEffect(() => {
    if (status.all && ordered?.orderStatusId.name === "Новые") {
      status.all.map((elem) => {
        if (elem.name === "Подтвержденные") dispatch(setOrderStatus(elem))
      })
    } else if (status.all && ordered?.orderStatusId.name === "Подтвержденные") {
      status.all.map((elem) => {
        if (elem.name === "Отмененые") dispatch(setOrderStatus(elem))
      })
    } else {
      dispatch(getOrderStatuses())
    }
  }, [status.all, params.id, ordered?.orderStatusId.name, dispatch])

  return (
    <OrderLayout title="NFS / Заказать">
      <div className="Order">
        <Container>
          <div className="Order__content">
            <main className="Order__main">
              {orderSteps}
            </main>

            <SideBar />
          </div>
        </Container>
      </div>
    </OrderLayout>
  )
}

export default Order
