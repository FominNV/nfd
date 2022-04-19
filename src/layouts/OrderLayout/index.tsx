import { FC } from "react"
import MainLayout from "layouts/MainLayout"
import Breadcrumbs from "components/Breadcrumbs"
import { IOrderLayoutProps } from "./types"

import "./styles.scss"

const OrderLayout: FC<IOrderLayoutProps> = ({ title, children }) => (
  <MainLayout title={title}>
    <Breadcrumbs />
    {children}
  </MainLayout>
)

export default OrderLayout
