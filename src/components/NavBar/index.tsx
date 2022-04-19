import { FC, MouseEvent, useCallback, useMemo } from "react"
import { useDispatch } from "react-redux"
import { useTypedSelector } from "store/selectors"
import { setLanguage, setDisplayMenu } from "store/common/actions"
import PopupMenu from "components/Popups/PopupMenu"
import classNames from "classnames"

import { ReactComponent as Close } from "assets/icons/NavBar/close.svg"
import { ReactComponent as Burger } from "assets/icons/NavBar/menu_btn.svg"
import { ReactComponent as Eng } from "assets/icons/NavBar/eng.svg"
import { ReactComponent as Rus } from "assets/icons/NavBar/rus.svg"
import { ReactComponent as Circle } from "assets/icons/NavBar/circle.svg"

import "./styles.scss"

const NavBar: FC = () => {
  const { showMenu, rusLang } = useTypedSelector((state) => state.common)
  const dispatch = useDispatch()

  const toggleLanguage = useCallback<EventFunc<MouseEvent>>(() => {
    dispatch(setLanguage(!rusLang))
  }, [dispatch, rusLang])

  const toggleMenu = useCallback<EventFunc<MouseEvent>>(() => {
    dispatch(setDisplayMenu(!showMenu))
  }, [dispatch, showMenu])

  const menuIcon = useMemo<JSX.Element>(() => (showMenu ? (
    <Close className="NavBar__menu_icon" />
  ) : (
    <Burger className="NavBar__menu_icon" />
  )), [showMenu])

  const langIcon = useMemo<JSX.Element>(() => (rusLang ? <Rus /> : <Eng />), [rusLang])
  const popuMenu = useMemo<JSX.Element | false>(() => (showMenu && <PopupMenu />), [showMenu])

  const navbarClassName = classNames("NavBar__menu", { NavBar__menu_active: showMenu })
  const langClassName = classNames("NavBar__lang", { NavBar__lang_active: showMenu })

  return (
    <>
      {popuMenu}
      <nav className="NavBar">
        <button
          className={navbarClassName}
          onClick={toggleMenu}
        >
          {menuIcon}
        </button>

        <div className={langClassName}>
          <button
            className="NavBar__lang_btn"
            onClick={toggleLanguage}
          >
            <div className="NavBar__lang_name">{langIcon}</div>
            <div className="NavBar__lang_circle">
              <Circle />
            </div>
          </button>
        </div>
      </nav>
    </>
  )
}

export default NavBar
