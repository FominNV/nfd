import { FC, useEffect } from "react"
import Button from "components/Button"
import Footer from "components/Footer"
import MainLayout from "layouts/MainLayout"
import Container from "components/Container"
import LandSection from "components/MainSections/LandSection"
import SliderSection from "components/MainSections/SliderSection"
import Slider from "components/SliderBlock/Slider"

import { ButtonBgColor } from "components/Button/types"
import { PATHS } from "routes/consts"

import "./styles.scss"
import { useDispatch } from "react-redux"
import { setPageTitle } from "store/common/actions"

const Main: FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPageTitle("NFD / Главная"))
  }, [dispatch])

  return (
    <div className="Main">
      <LandSection>
        <MainLayout>
          <main className="Main__main">
            <Container>
              <div className="Main__content">
                <p className="Main__tagline1">Каршеринг</p>
                <p className="Main__tagline2">Need for drive</p>
                <p className="Main__tagline3">Поминутная аренда авто твоего города</p>

                <div className="Main__btn">
                  <Button
                    name="Забронировать"
                    bgColor={ButtonBgColor.GREEN}
                    navigatePath={PATHS.ORDER_PLACE}
                  />
                </div>
              </div>
            </Container>
          </main>
          <Footer />
        </MainLayout>
      </LandSection>

      <SliderSection>
        <Slider />
      </SliderSection>
    </div>
  )
}

export default Main
