export interface ICommonState {
  menuPopup: boolean
  orderPopup: boolean
  rusLang: boolean
  loading: boolean
  pageTitle: string
  city: string
}
export interface CommonDispatch<T> {
  (value: T): CommonAction
}

export enum CommonActionTypes {
  SET_LANGUAGE = "SET_LANGUAGE",
  SHOW_MENU_POPUP = "SHOW_MENU_POPUP",
  SHOW_ORDER_POPUP = "SHOW_ORDER_POPUP",
  SET_LOADING = "SET_LOADING",
  SET_PAGE_TITLE = "SET_PAGE_TITLE"
}

type ShowMenuPopupAction = {
  type: CommonActionTypes.SHOW_MENU_POPUP
  payload: { menuPopup: boolean }
}

type ShowOrderPopupAction = {
  type: CommonActionTypes.SHOW_ORDER_POPUP
  payload: { orderPopup: boolean }
}

type SetLanguageAction = {
  type: CommonActionTypes.SET_LANGUAGE
  payload: { rusLang: boolean }
}

type SetLoadingAction = {
  type: CommonActionTypes.SET_LOADING
  payload: { loading: boolean }
}

type SetPageTitleAction = {
  type: CommonActionTypes.SET_PAGE_TITLE
  payload: { pageTitle: string }
}

export type CommonAction =
  | SetLanguageAction
  | ShowMenuPopupAction
  | ShowOrderPopupAction
  | SetLoadingAction
  | SetPageTitleAction
