import { FC } from "react"
import Button from "components/Button"
import classNames from "classnames"

import { ButtonBorderRadius, ButtonColor } from "components/Button/types"
import { PATHS } from "routes/consts"
import { ISliderItemProps } from "./types"
import "./styles.scss"

const SliderItem: FC<ISliderItemProps> = ({ active, path, title, text, buttonColor }) => {
  const itemClassName = classNames("SliderItem", { SliderItem_active: active })

  return (
    <div className={itemClassName}>
      <img
        src={path}
        alt="car"
        className="SliderItem__img"
      />

      <div className="SliderItem__content">
        <p className="SliderItem__title">{title}</p>
        <p className="SliderItem__text">{text}</p>

        <div className="SliderItem__btn">
          <Button
            name="Подробнее"
            bgColor={buttonColor}
            color={ButtonColor.GRAY}
            borderRadius={ButtonBorderRadius.SMALL}
            navigatePath={PATHS.ORDER_PLACE}
          />
        </div>
      </div>
    </div>
  )
}

export default SliderItem
