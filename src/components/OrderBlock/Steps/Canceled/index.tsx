import Loading from "components/Loading"
import { FC, ReactNode, useMemo } from "react"
import { useTypedSelector } from "store/selectors"

import "./styles.scss"

const Canceled: FC = () => {
  const { loading } = useTypedSelector((state) => state.common)

  const content = useMemo<ReactNode>(
    () => (loading ? <Loading /> : <div className="Canceled__order-text">Ваш заказ отменен</div>),
    [loading]
  )

  return <div className="Total">{content}</div>
}

export default Canceled
