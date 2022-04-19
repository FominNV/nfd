import { FC } from "react"
import { Helmet } from "react-helmet-async"
import Header from "components/Header"
import NavBar from "components/NavBar"
import { IMainLayoutProps } from "./types"

import "./styles.scss"

const MainLayout: FC<IMainLayoutProps> = ({ children, title }) => (
  <>
    <Helmet>
      <title>{title}</title>
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

export default MainLayout
