import { ButtonBgColor } from "components/Button/types"

import page1 from "assets/images/Slider/page1.jpg"
import page2 from "assets/images/Slider/page2.jpg"
import page3 from "assets/images/Slider/page3.jpg"
import page4 from "assets/images/Slider/page4.jpg"
import { IDataSlider } from "./types"

const dataSlider: IDataSlider[] = [
  {
    imgPath: page1,
    title: "Бесплатная парковка",
    text: `Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах.`,
    btnColor: ButtonBgColor.GREEN_DARK
  },
  {
    imgPath: page2,
    title: "Страховка",
    text: "Полная страховка автомобиля",
    btnColor: ButtonBgColor.CLOUDY
  },
  {
    imgPath: page3,
    title: "Бензин",
    text: "Полный бак на любой заправке города за наш счёт",
    btnColor: ButtonBgColor.BROWN_RED
  },
  {
    imgPath: page4,
    title: "Обслуживание",
    text: "Автомобиль проходит еженедельное ТО",
    btnColor: ButtonBgColor.PURPLE
  }
]

export default dataSlider
