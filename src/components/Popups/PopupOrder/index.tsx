import { FC, MouseEvent, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from 'store/selectors'
import { setLoading } from 'store/common/actions'
import { postOrder } from 'store/order/actions'
import { PATHS } from 'routes/consts'
import { ButtonBgColor, ButtonBorderRadius } from 'components/Button/types'
import Button from 'components/Button'
import { ChangeOrderStatusType, IPopupOrderProps } from './types'

import './styles.scss'

const PopupOrder: FC<IPopupOrderProps> = ({ onClick }) => {
  const { ordered, status } = useTypedSelector((state) => state.order)
  const params = useParams()
  const dispatch = useDispatch()

  const changeOrderStatus = useCallback<ChangeOrderStatusType>((order, currentStatus) => {
    const fetchOrder = order
    fetchOrder.orderStatusId = currentStatus
    dispatch(postOrder(fetchOrder))
  }, [dispatch])

  const onClickHandler = useCallback<EventFunc<MouseEvent>>((e) => {
    dispatch(setLoading(true))
    onClick(e)
    return ordered && status.current && changeOrderStatus(ordered, status.current)
  }, [ordered, status, dispatch, onClick, changeOrderStatus])

  const confirmName = params.id === "ordered" ? "Отменить" : "Подтвердить"
  const navigatePath = params.id === "ordered" ? PATHS.ORDER_CANCELED : PATHS.ORDER_ORDERED
  const popupTitle = params.id === "ordered" ? "Отменить заказ" : "Подтвердить заказ"

  return (
    <div className="PopupOrder">
      <div className="PopupOrder__bacground-left" />
      <div className="PopupOrder__bacground-right" />

      <div className="PopupOrder__content">
        <div className="PopupOrder__title">{popupTitle}</div>
        <div className="PopupOrder__buttons">
          <div
            className="PopupOrder__buttons__confirm-cancel"
          >
            <Button
              name={confirmName}
              bgColor={ButtonBgColor.GREEN}
              borderRadius={ButtonBorderRadius.SMALL}
              navigatePath={navigatePath}
              onClick={onClickHandler}
            />
          </div>
          <div className="PopupOrder__buttons__cancel">
            <Button
              name="Вернуться"
              bgColor={ButtonBgColor.BROWN_RED}
              borderRadius={ButtonBorderRadius.SMALL}
              onClick={onClick}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopupOrder
