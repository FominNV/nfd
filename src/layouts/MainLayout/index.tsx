import { FC } from "react"
import { Helmet } from "react-helmet-async"
import { useTypedSelector } from "store/selectors"
import Header from "components/Header"
import NavBar from "components/NavBar"

import "./styles.scss"

const MainLayout: FC = ({ children }) => {
  const { pageTitle } = useTypedSelector((state) => state.common)

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>

      <div className="MainLayout">
        <NavBar />

        <div className="MainLayout__content">
          <Header />
          {children}
        </div>
      </div>
    </>
  )
}

export default MainLayout
