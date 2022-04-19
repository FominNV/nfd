import { FC } from "react"
import Container from "components/Container"

import "./styles.scss"

const Footer: FC = () => (
  <footer className="Footer">
    <Container>
      <div className="Footer__content">
        <p className="Footer__info">© 2016-2019 «Need for drive»</p>

        <a
          href="tel:+74952342244"
          className="Footer__phone"
        >
          8 (495) 234-22-44
        </a>
      </div>
    </Container>
  </footer>
)

export default Footer
