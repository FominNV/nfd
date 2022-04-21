import { FC, MouseEvent, useCallback } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useTypedSelector } from "store/selectors"
import { setLoading, showOrderPopup } from "store/common/actions"
import { postOrder } from "store/order/actions"
import Button from "components/Button"
import { PATHS } from "routes/consts"
import { ButtonBgColor, ButtonBorderRadius } from "components/Button/types"
import { IOrdered, IOrderStatus } from "store/order/types"
import { ChangeOrderStatusType } from "./types"

import "./styles.scss"

const PopupOrder: FC = () => {
  const { ordered, status } = useTypedSelector((state) => state.order)
  const { loading } = useTypedSelector((state) => state.common)
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const changeOrderStatus = useCallback<ChangeOrderStatusType>(
    async (order, currentStatus, path) => {
      dispatch(setLoading(true))
      const fetchOrder = order
      fetchOrder.orderStatusId = currentStatus
      await dispatch(postOrder(fetchOrder))
      dispatch(showOrderPopup(false))
      navigate(path)
      dispatch(setLoading(false))
    },
    [navigate, dispatch]
  )

  const confirmOrder = useCallback<EventFunc<MouseEvent>>(() => {
    const currentOrder = ordered as IOrdered
    const currentStatus = status.confirm as IOrderStatus
    const url = PATHS.ORDER + (ordered?.id as string)
    changeOrderStatus(currentOrder, currentStatus, url)
  }, [ordered, status.confirm, changeOrderStatus])

  const cancelOrder = useCallback<EventFunc<MouseEvent>>(() => {
    const currentOrder = ordered as IOrdered
    const currentStatus = status.cancel as IOrderStatus
    changeOrderStatus(currentOrder, currentStatus, PATHS.ORDER_CANCELED)
  }, [ordered, status.cancel, changeOrderStatus])

  const closePopup = useCallback<EventFunc<MouseEvent>>(() => {
    dispatch(showOrderPopup(false))
  }, [dispatch])

  const buttonName =
    (ordered && ordered.orderStatusId.name === "Новые" && "Подтвердить") || "Отменить"
  const popupTitle =
    (params.id === "total" && "Подтвердить заказ") || "Отменить заказ"
  const postAction =
    (ordered && ordered.orderStatusId.name === "Новые" && confirmOrder) ||
    (ordered && ordered.orderStatusId.name === "Подтвержденные" && cancelOrder) ||
    undefined

  return (
    <div className="PopupOrder">
      <div className="PopupOrder__bacground-left" />
      <div className="PopupOrder__bacground-right" />

      <div className="PopupOrder__content">
        <div className="PopupOrder__title">{popupTitle}</div>
        <div className="PopupOrder__buttons">
          <div className="PopupOrder__buttons__confirm-cancel">
            <Button
              name={buttonName}
              bgColor={ButtonBgColor.GREEN}
              borderRadius={ButtonBorderRadius.SMALL}
              disabled={loading}
              loading={loading}
              onClick={postAction}
            />
          </div>
          <div className="PopupOrder__buttons__cancel">
            <Button
              name="Вернуться"
              bgColor={ButtonBgColor.BROWN_RED}
              borderRadius={ButtonBorderRadius.SMALL}
              onClick={closePopup}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopupOrder
