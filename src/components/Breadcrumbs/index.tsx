import { FC, useMemo } from "react"
import { Link, useParams } from "react-router-dom"
import { useTypedSelector } from "store/selectors"
import Container from "components/Container"
import classNames from "classnames"

import { ReactComponent as Triangle } from "assets/icons/Breadcrumbs/triangle.svg"
import dataBreadcrumbs from "./data"

import "./styles.scss"

const Breadcrumbs: FC = () => {
  const { order } = useTypedSelector((state) => state)
  const params = useParams()

  const links = useMemo<JSX.Element[]>(() => dataBreadcrumbs.map((elem, index) => {
    const itemClassName = classNames(
      "Breadcrumbs__item",
      {
        Breadcrumbs__item_active: params.id === elem.id
      },
      {
        Breadcrumbs__item_disabled: !order.unlockedStep[elem.id]
      }
    )

    return (
      <Link
        to={elem.path}
        className={itemClassName}
        key={elem.id}
      >
        {elem.title}
        <div className="Breadcrumbs__icon">
          {index + 1 !== dataBreadcrumbs.length && <Triangle />}
        </div>
      </Link>
    )
  }), [params.id, order])

  const orderNumber = useMemo<JSX.Element | null>(() => (
    order.ordered && (
    <div className="Breadcrumbs__order-number">
      Заказ номер {order.ordered.id}
    </div>
    )
  ), [order.ordered])

  const content = params.id === "ordered" ? orderNumber : links

  return (
    <div className="Breadcrumbs">
      <Container>
        <div className="Breadcrumbs__content">{content}</div>
      </Container>
    </div>
  )
}

export default Breadcrumbs
