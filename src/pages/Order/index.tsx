import { FC, ReactNode, useCallback, useEffect, useMemo } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useTypedSelector } from "store/selectors"
import { useDispatch } from "react-redux"
import { setLoading, setPageTitle } from "store/common/actions"
import {
  getOrder,
  getOrderStatuses,
  setOrder,
  setOrdered,
  setOrderStatus
} from "store/order/actions"
import OrderLayout from "layouts/OrderLayout"
import Container from "components/Container"
import PopupOrder from "components/Popups/PopupOrder"
import SideBar from "components/SideBarBlock/SideBar"
import classNames from "classnames"
import { PATHS } from "routes/consts"
import { IOrderStatus } from "store/order/types"
import { dataOrderStatuses, dataOrderSteps, dataPageTitles } from "./data"

import "./styles.scss"

const Order: FC = () => {
  const { place, ordered, status } = useTypedSelector((state) => state.order)
  const { orderPopup } = useTypedSelector((state) => state.common)
  const location = useLocation()
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const setOrderStatuses = useCallback<VoidFunc<IOrderStatus[]>>(
    (data) =>
      data.map((elem) => {
        dataOrderStatuses.map((item) => {
          if (item.status === elem.name) {
            dispatch(setOrderStatus(item.key, elem))
          }
        })
      }),
    [dispatch]
  )

  const loadOrder = useCallback<VoidFunc<string>>(
    async (id) => {
      dispatch(setLoading(true))
      await dispatch(getOrder(id))
      const url = PATHS.ORDER + (ordered?.id as string)
      navigate(url)
      dispatch(setLoading(false))
    },
    [ordered?.id, navigate, dispatch]
  )

  const orderSteps = useMemo<ReactNode>(
    () =>
      dataOrderSteps.map((elem, index) => {
        let blockClassName = classNames("Order__step", {
          Order__step_active: params.id === elem.id
        })
        if (elem.id === "ordered") {
          blockClassName = classNames("Order__step", {
            Order__step_active: params.id === ordered?.id
          })
        }

        return (
          <div
            className={blockClassName}
            key={elem.id + index}
          >
            {elem.component}
          </div>
        )
      }),
    [params.id, ordered?.id]
  )

  useEffect(() => {
    if (ordered && ordered.orderStatusId.name === "Подтвержденные") {
      const url = PATHS.ORDER + ordered.id
      navigate(url)
    }
  }, [ordered, navigate])

  useEffect(() => {
    if (localStorage.getItem("nfd_ordered_id") && !ordered) {
      const id = localStorage.getItem("nfd_ordered_id") as string
      loadOrder(id)
    } else if (location.pathname !== PATHS.ORDER_PLACE && !place.street) {
      navigate(PATHS.ORDER_PLACE)
    }
  }, [])

  useEffect(() => {
    if (ordered && ordered.orderStatusId.name === "Подтвержденные") {
      localStorage.setItem("nfd_ordered_id", ordered.id)
    }
  }, [ordered, dispatch])

  useEffect(() => {
    if (ordered && ordered.orderStatusId.name === "Отмененые") {
      localStorage.removeItem("nfd_ordered_id")
      dispatch(setOrder(null))
      dispatch(setOrdered(null))
      navigate(PATHS.ORDER_CANCELED)
    }
  }, [ordered, dispatch, navigate])

  useEffect(() => {
    if (!status.all) {
      dispatch(getOrderStatuses())
    }
  }, [status.all, dispatch])

  useEffect(() => {
    if (status.all) {
      setOrderStatuses(status.all)
    }
  }, [status.all, setOrderStatuses])

  useEffect(() => {
    dataPageTitles.map((elem) => {
      if (elem.id === params.id) dispatch(setPageTitle(elem.title))
      if (ordered && ordered.id === params.id) dispatch(setPageTitle("NFD / Ваш заказ"))
    })
  }, [params.id, ordered, dispatch])

  const popup = useMemo<ReactNode>(() => orderPopup && <PopupOrder />, [orderPopup])

  return (
    <OrderLayout>
      <div className="Order">
        <Container>
          {popup}
          <div className="Order__content">
            <main className="Order__main">{orderSteps}</main>
            <SideBar />
          </div>
        </Container>
      </div>
    </OrderLayout>
  )
}

export default Order
