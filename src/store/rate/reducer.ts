import { IRateState, RateAction, RateActionTypes } from "./types"

const initialState: IRateState = {
  all: null,
  current: null
}

export function rateReducer(state: IRateState = initialState, action: RateAction): IRateState {
  switch (action.type) {
    case RateActionTypes.GET_RATES:
      return {
        ...state,
        all: action.payload.rates
      }

    case RateActionTypes.SET_CURRENT_RATE:
      return {
        ...state,
        current: action.payload.rate
      }

    default:
      return state
  }
}
