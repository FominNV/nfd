import { FC, useMemo } from "react"
import { useParams } from "react-router-dom"
import { useTypedSelector } from "store/selectors"

import OrderedSection from "../OrderedSection"
import OrderSection from "../OrderSection"

import "./styles.scss"

const SideBar: FC = () => {
  const { ordered } = useTypedSelector((state) => state.order)
  const params = useParams()

  const orderedContent = useMemo(
    () => ordered && ordered.id === params.id && <OrderedSection />,
    [ordered, params.id]
  )
  const content = orderedContent || <OrderSection />

  return (
    <div className="SideBar">
      <h3 className="SideBar__title">Ваш заказ:</h3>
      {content}
    </div>
  )
}

export default SideBar
