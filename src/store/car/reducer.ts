import { CarAction, CarActionTypes, ICarState } from "./types"

const initialState: ICarState = {
  cars: {
    all: null,
    current: null
  },
  category: {
    all: null,
    current: null
  }
}

export function carReducer(state: ICarState = initialState, action: CarAction): ICarState {
  switch (action.type) {
    case CarActionTypes.GET_CARS:
      return {
        ...state,
        cars: { ...state.cars, all: action.payload.cars }
      }

    case CarActionTypes.SET_CURRENT_CAR:
      return {
        ...state,
        cars: { ...state.cars, current: action.payload.current }
      }

    case CarActionTypes.GET_CATEGORIES:
      return {
        ...state,
        category: { ...state.category, all: action.payload.categories }
      }

    case CarActionTypes.SET_CURRENT_CATEGORY:
      return {
        ...state,
        category: { ...state.category, current: action.payload.current }
      }

    default:
      return state
  }
}
