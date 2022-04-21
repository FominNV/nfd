import { CommonAction, CommonActionTypes, ICommonState } from "./types"

const initialState: ICommonState = {
  menuPopup: false,
  orderPopup: false,
  rusLang: false,
  loading: false,
  pageTitle: "NFD",
  city: "Екатеринбург"
}

export function commonReducer(
  state: ICommonState = initialState,
  action: CommonAction
): ICommonState {
  switch (action.type) {
    case CommonActionTypes.SET_LANGUAGE:
      return {
        ...state,
        rusLang: action.payload.rusLang
      }

    case CommonActionTypes.SHOW_MENU_POPUP:
      return {
        ...state,
        menuPopup: action.payload.menuPopup
      }

    case CommonActionTypes.SHOW_ORDER_POPUP:
      return {
        ...state,
        orderPopup: action.payload.orderPopup
      }

    case CommonActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload.loading
      }

    case CommonActionTypes.SET_PAGE_TITLE:
      return {
        ...state,
        pageTitle: action.payload.pageTitle
      }

    default:
      return state
  }
}
