import { CommonActionTypes, CommonDispatch } from "./types"

export const setDisplayMenu: CommonDispatch<boolean> = (showMenu) => {
  return {
    type: CommonActionTypes.SET_DISPLAY_MENU,
    payload: { showMenu }
  }
}

export const setLanguage: CommonDispatch<boolean> = (rusLang) => {
  return {
    type: CommonActionTypes.SET_LANGUAGE,
    payload: { rusLang }
  }
}

export const setLoading: CommonDispatch<boolean> = (loading) => {
  return {
    type: CommonActionTypes.SET_LOADING,
    payload: { loading }
  }
}
