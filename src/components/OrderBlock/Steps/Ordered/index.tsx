import { FC, useCallback, useEffect, useMemo } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { useTypedSelector } from "store/selectors"
import { getOrder, setOrder } from "store/order/actions"
import { setLoading } from "store/common/actions"
import { format } from "date-fns"
import Loading from "components/Loading"
import dataServiceItems from "../Total/data"

import "./styles.scss"

const Ordered: FC = () => {
  const { order, common } = useTypedSelector((state) => state)
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const loadOrder = useCallback<VoidFunc<string>>(
    async (id) => {
      dispatch(setLoading(true))
      await dispatch(getOrder(id))
      dispatch(setLoading(false))
    },
    [dispatch]
  )

  useEffect(() => {
    if (params.id === "ordered" && localStorage.getItem("nfd_ordered") && !order.ordered) {
      const id: Nullable<string> = localStorage.getItem("nfd_ordered")
      if (id) loadOrder(id)
    }
  }, [params.id, order.ordered, loadOrder])

  useEffect(() => {
    if (order.ordered && order.ordered.orderStatusId.name === "Подтвержденные") {
      localStorage.setItem("nfd_ordered", order.ordered.id)
      dispatch(setLoading(false))
    }
  }, [order.ordered, dispatch])

  // useEffect(() => {
  //   if (order.ordered && params.id === "ordered") {
  //     navigate(order.ordered.id)
  //   }
  // }, [order.ordered, params.id, navigate])

  useEffect(() => {
    if (order.ordered && order.ordered.orderStatusId.name === "Отмененые") {
      localStorage.removeItem("nfd_ordered")
      dispatch(setLoading(false))
    }
  }, [order.ordered, dispatch])

  useEffect(() => {
    if (params.id === "canceled") {
      dispatch(setOrder(null))
    }
    dispatch(setOrder(null))
  }, [params.id, dispatch])

  const addServices = useMemo<(
JSX.Element | false)[]>(
    () =>
      dataServiceItems.map((elem) => {
        if (order.ordered && order.ordered[elem.id]) {
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
    [order.ordered]
    )

  const availableFrom = useMemo<JSX.Element | null | false>(
    () =>
      order.ordered &&
      params.id === "ordered" && (
        <div className="Ordered__item">
          Доступна с{" "}
          <span className="Ordered__item_text-light">
            {format(new Date(order.ordered.createdAt), "dd.MM.yyyy kk:mm")}
          </span>
        </div>
      ),
    [order.ordered, params.id]
  )

  const availableTo = useMemo<JSX.Element | null | false>(
    () =>
      order.ordered &&
      params.id === "ordered" && (
        <div className="Ordered__item">
          Доступна по{" "}
          <span className="Ordered__item_text-light">
            {format(new Date(order.ordered.dateTo), "dd.MM.yyyy kk:mm")}
          </span>
        </div>
      ),
    [order.ordered, params.id]
  )

  const carNumber = useMemo<"" | JSX.Element | undefined>(
    () =>
      order.ordered?.carId.number && (
        <div className="Total__car-number">
          {order.ordered?.carId.number.replace(/(\d+)/g, " $1 ")}
        </div>
      ),
    [order.ordered]
  )

  const orderText = params.id === "ordered" ? "Ваш заказ подтверждён" : "Ваш заказ отменен"

  const content = useMemo<JSX.Element>(
    () =>
      (common.loading ? (
        <Loading />
      ) : (
        <>
          <div className="Ordered__order-text">{orderText}</div>
          <div className="Total__model">{order.ordered?.carId.name}</div>
          {carNumber}
          {addServices}
          {availableFrom}
          {availableTo}
        </>
      )),
    [
      common.loading,
      order.ordered?.carId.name,
      addServices,
      availableFrom,
      availableTo,
      carNumber,
      orderText
    ]
  )

  return <div className="Total">{content}</div>
}

export default Ordered
