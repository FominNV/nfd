import { FC } from "react"
import { Link } from "react-router-dom"
import { useTypedSelector } from "store/selectors"
import Container from "components/Container"

import { ReactComponent as Map } from "assets/icons/Header/map.svg"
import { PATHS } from "routes/consts"

import "./styles.scss"

const Header: FC = () => {
  const { city } = useTypedSelector((state) => state.common)

  return (
    <header className="Header">
      <Container>
        <div className="Header__content">
          <Link
            to={PATHS.MAIN}
            className="Header__logo"
          >
            Need for drive
          </Link>

          <div className="Header__city">
            <Map />
            <div className="Header__city_name">{city}</div>
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Header
