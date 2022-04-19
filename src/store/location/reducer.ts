import { ILocationState, LocationAction, LocationActionTypes } from "./types"

const initialState: ILocationState = {
  cities: null,
  points: null
}

export function locationReducer(
  state: ILocationState = initialState,
  action: LocationAction
): ILocationState {
  switch (action.type) {
    case LocationActionTypes.GET_POINTS: {
      return {
        ...state,
        points: action.payload.points
      }
    }

    default:
      return state
  }
}
